import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

/**
 * Noqoody Payment Gateway Integration (Sandbox)
 * 
 * Noqoody endpoints:
 * - Sandbox: https://sandbox.noqoodypay.com
 * - Production: https://noqoodypay.com
 * 
 * Required env vars for production:
 *   NOQOODY_MERCHANT_ID, NOQOODY_API_KEY, NOQOODY_BASE_URL, NOQOODY_WEBHOOK_SECRET
 */

const NOQOODY_WEBHOOK_SECRET = process.env.NOQOODY_WEBHOOK_SECRET || '';

/**
 * Verify HMAC payment token to prevent IDOR attacks.
 * The token is generated in the checkout API using the same secret.
 */
function verifyPaymentToken(orderId: string, amount: string, token: string): boolean {
  const paymentSecret = process.env.AUTH_SECRET || 'fallback-secret';
  const expectedToken = crypto
    .createHmac('sha256', paymentSecret)
    .update(`${orderId}:${amount}`)
    .digest('hex');
  
  // Constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(expectedToken)
  );
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');
  const token = searchParams.get('token');

  if (!orderId || !amount || !token) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  // ── Verify HMAC token (prevents IDOR) ──
  try {
    if (!verifyPaymentToken(orderId, amount, token)) {
      return NextResponse.json({ error: 'Invalid payment token' }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: 'Invalid payment token' }, { status: 403 });
  }

  try {
    // === SANDBOX SIMULATION ===
    // Simulate 1.5s payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mark order as paid in the database
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'PAID',
        status: 'PROCESSING',
      },
    });

    // Determine locale for redirect
    const acceptLanguage = req.headers.get('accept-language');
    const locale = acceptLanguage?.includes('en') ? 'en' : 'ar';

    const successUrl = new URL(
      `/${locale}/order/success?orderNumber=${order.orderNumber}`,
      req.url
    );

    return NextResponse.redirect(successUrl);

  } catch (error) {
    console.error('Noqoody Payment Error:', error);
    return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 });
  }
}

/**
 * Noqoody Callback Webhook
 * 
 * In production, Noqoody sends a POST request to this endpoint
 * when payment status changes. This updates the order accordingly.
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();

    // ── Verify webhook signature ──
    const signature = req.headers.get('x-noqoody-signature');
    if (NOQOODY_WEBHOOK_SECRET && NOQOODY_WEBHOOK_SECRET !== 'change-me-in-production') {
      if (!signature) {
        console.warn('Webhook rejected: missing signature header');
        return NextResponse.json({ error: 'Missing signature' }, { status: 403 });
      }

      const expectedSignature = crypto
        .createHmac('sha256', NOQOODY_WEBHOOK_SECRET)
        .update(rawBody)
        .digest('hex');

      try {
        const isValid = crypto.timingSafeEqual(
          Buffer.from(signature),
          Buffer.from(expectedSignature)
        );
        if (!isValid) {
          console.warn('Webhook rejected: invalid signature');
          return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
        }
      } catch {
        console.warn('Webhook rejected: signature verification failed');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
      }
    }

    const body = JSON.parse(rawBody);
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json({ error: 'Missing orderId or status' }, { status: 400 });
    }

    if (status === 'SUCCESS') {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: 'PAID',
          status: 'PROCESSING',
        },
      });
    } else if (status === 'FAILED') {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: 'FAILED',
        },
      });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Noqoody Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
