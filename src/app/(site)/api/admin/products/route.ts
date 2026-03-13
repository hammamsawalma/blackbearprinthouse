import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';

/**
 * GET /api/admin/products — List all products
 * POST /api/admin/products — Create a new product
 */
export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { orderItems: true } },
      },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (err) {
    console.error('Admin Products GET Error:', err);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await req.json();

    const { nameAr, nameEn, descriptionAr, descriptionEn, price, category, isCustomizable, hasSizeOptions, image, isEidOffer, offerPrice, offerImage } = body;

    if (!nameAr || !nameEn || !price || !category) {
      return NextResponse.json({ error: 'Missing required fields: nameAr, nameEn, price, category' }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        nameAr,
        nameEn,
        descriptionAr: descriptionAr || '',
        descriptionEn: descriptionEn || '',
        price: parseFloat(price),
        category,
        isCustomizable: !!isCustomizable,
        hasSizeOptions: !!hasSizeOptions,
        image: image || null,
        isEidOffer: !!isEidOffer,
        offerPrice: offerPrice ? parseFloat(offerPrice) : null,
        offerImage: offerImage || null,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    console.error('Admin Products POST Error:', err);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
