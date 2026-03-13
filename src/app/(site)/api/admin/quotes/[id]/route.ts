import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';

/**
 * PUT /api/admin/quotes/[id] — Update quote status, add notes, set quoted price
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
    const { status, adminNotes, quotedPrice } = body;

    const validStatuses = ['PENDING', 'REVIEWED', 'QUOTED', 'REJECTED'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: `Invalid status. Must be: ${validStatuses.join(', ')}` }, { status: 400 });
    }

    const quote = await prisma.quoteRequest.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(adminNotes !== undefined && { adminNotes }),
        ...(quotedPrice !== undefined && { quotedPrice: quotedPrice ? parseFloat(quotedPrice) : null }),
      },
    });

    return NextResponse.json({ quote }, { status: 200 });
  } catch (err) {
    console.error('Admin Quote PUT Error:', err);
    return NextResponse.json({ error: 'Failed to update quote' }, { status: 500 });
  }
}
