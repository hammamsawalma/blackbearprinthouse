import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  // ── Development-only guard ──
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Payment simulation is disabled in production' },
      { status: 403 }
    );
  }

  const searchParams = req.nextUrl.searchParams;
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');
  
  // Simulate payment processing time
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (!orderId) {
    return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
  }

  try {
    // 1. Update order status to paid
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'PAID',
        status: 'PROCESSING',
      }
    });

    // 2. Redirect back to the frontend success page
    const acceptLanguage = req.headers.get('accept-language');
    const locale = acceptLanguage?.includes('en') ? 'en' : 'ar';
    
    const successUrl = new URL(`/${locale}/order/success?orderNumber=${order.orderNumber}`, req.url);
    return NextResponse.redirect(successUrl);

  } catch (error) {
    console.error('Payment Simulation Error:', error);
    return NextResponse.json({ error: 'Failed to process payment callback' }, { status: 500 });
  }
}
