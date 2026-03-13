import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { products } from '@/data/products';
import { sendEmail, orderConfirmationEmail } from '@/lib/email';
import { checkoutLimiter, getClientIp } from '@/lib/rate-limit';
import { validateCheckoutCustomer, validateCartItems } from '@/lib/validate';

export async function POST(req: NextRequest) {
  // ── Rate Limiting ──
  const ip = getClientIp(req);
  const { success: allowed, remaining } = checkoutLimiter.check(ip, 3);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many checkout attempts. Please wait a minute.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  try {
    const body = await req.json();

    // ── Input Validation ──
    const cartResult = validateCartItems(body.items);
    if (!cartResult.valid) {
      return NextResponse.json({ error: cartResult.error }, { status: 400 });
    }

    const customerResult = validateCheckoutCustomer(body.customer || {});
    if (!customerResult.valid) {
      return NextResponse.json({ error: customerResult.error }, { status: 400 });
    }

    const items = cartResult.data;
    const customer = customerResult.data;

    // 1. Calculate actual totals from server-side products list (security)
    let subtotal = 0;
    const orderItemsData = [];

    for (const item of items) {
      const dbProduct = products.find(p => p.id === item.id);
      if (!dbProduct) {
        return NextResponse.json({ error: `Product not found: ${item.id}` }, { status: 400 });
      }

      // Ensure product exists in DB (sync static catalogue to DB if needed)
      await prisma.product.upsert({
        where: { id: dbProduct.id },
        update: {},
        create: {
          id: dbProduct.id,
          nameAr: dbProduct.ar.name,
          nameEn: dbProduct.en.name,
          descriptionAr: dbProduct.ar.desc,
          descriptionEn: dbProduct.en.desc,
          price: dbProduct.price,
          category: dbProduct.category,
        }
      });

      const itemSubtotal = dbProduct.price * item.qty;
      subtotal += itemSubtotal;

      orderItemsData.push({
        productId: dbProduct.id,
        quantity: item.qty,
        unitPrice: dbProduct.price,
        subtotal: itemSubtotal,
      });
    }

    const vatAmount = Math.round(subtotal * 0.05);
    const totalAmount = subtotal + vatAmount;
    
    // Generate a unique order number like BBPH-2024-XXXX
    const orderNumber = `BBPH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 2. Create the Order and Customer in a transaction
    const order = await prisma.order.create({
      data: {
        orderNumber,
        contactName: customer.name,
        contactEmail: customer.email,
        contactPhone: customer.phone,
        status: 'PENDING',
        subtotal,
        vatAmount,
        totalAmount,
        deliveryAddress: `${customer.address}, ${customer.area || ''}`,
        paymentMethod: 'NOQOODY',
        paymentStatus: 'PENDING',
        items: {
          create: orderItemsData,
        },
        customer: {
          create: {
             name: customer.name,
             email: customer.email,
             phone: customer.phone,
             company: customer.company || null,
          }
        }
      },
      include: {
        items: true,
      }
    });

    // 3. Send order confirmation email
    const emailTemplate = orderConfirmationEmail(order.orderNumber, customer.name, totalAmount);
    emailTemplate.to = customer.email;
    await sendEmail(emailTemplate);

    // 4. Generate HMAC-signed payment token to prevent IDOR
    const paymentSecret = process.env.AUTH_SECRET || 'fallback-secret';
    const paymentToken = crypto
      .createHmac('sha256', paymentSecret)
      .update(`${order.id}:${totalAmount}`)
      .digest('hex');

    const paymentUrl = `/api/payment/noqoody?orderId=${order.id}&amount=${totalAmount}&token=${paymentToken}`;

    return NextResponse.json({ 
      success: true, 
      orderId: order.id,
      orderNumber: order.orderNumber,
      paymentUrl
    }, { status: 200 });

  } catch (error) {
    console.error('Checkout API Error:', error);
    return NextResponse.json({ error: 'Internal server error during checkout' }, { status: 500 });
  }
}
