import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';

/**
 * PUT /api/admin/orders/[id] — Update order status
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;

  try {
    const body = await req.json();
    const { status, paymentStatus } = body;

    const validStatuses = ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'];
    const validPaymentStatuses = ['PENDING', 'PAID', 'FAILED'];

    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: `Invalid status. Must be: ${validStatuses.join(', ')}` }, { status: 400 });
    }

    if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
      return NextResponse.json({ error: `Invalid payment status. Must be: ${validPaymentStatuses.join(', ')}` }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(paymentStatus && { paymentStatus }),
      },
      include: { items: { include: { product: true } } },
    });

    return NextResponse.json({ order }, { status: 200 });
  } catch (err) {
    console.error('Admin Order PUT Error:', err);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
