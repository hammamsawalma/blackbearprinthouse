import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';

/**
 * GET /api/admin/products/[id] — Get single product
 * PUT /api/admin/products/[id] — Update product
 * DELETE /api/admin/products/[id] — Delete product
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { _count: { select: { orderItems: true } } },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (err) {
    console.error('Admin Product GET Error:', err);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;

  try {
    const body = await req.json();

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(body.nameAr !== undefined && { nameAr: body.nameAr }),
        ...(body.nameEn !== undefined && { nameEn: body.nameEn }),
        ...(body.descriptionAr !== undefined && { descriptionAr: body.descriptionAr }),
        ...(body.descriptionEn !== undefined && { descriptionEn: body.descriptionEn }),
        ...(body.price !== undefined && { price: parseFloat(body.price) }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.isCustomizable !== undefined && { isCustomizable: !!body.isCustomizable }),
        ...(body.hasSizeOptions !== undefined && { hasSizeOptions: !!body.hasSizeOptions }),
        ...(body.image !== undefined && { image: body.image }),
        ...(body.isEidOffer !== undefined && { isEidOffer: !!body.isEidOffer }),
        ...(body.offerPrice !== undefined && { offerPrice: body.offerPrice ? parseFloat(body.offerPrice) : null }),
        ...(body.offerImage !== undefined && { offerImage: body.offerImage }),
      },
    });

    return NextResponse.json({ product }, { status: 200 });
  } catch (err) {
    console.error('Admin Product PUT Error:', err);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;

  try {
    // Check if product has orders
    const orderCount = await prisma.orderItem.count({ where: { productId: id } });
    if (orderCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete product — it has ${orderCount} orders. Archive it instead.` },
        { status: 409 }
      );
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Admin Product DELETE Error:', err);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
