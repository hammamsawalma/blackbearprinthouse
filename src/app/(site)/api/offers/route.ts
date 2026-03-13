import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const offers = await prisma.product.findMany({
      where: {
        isEidOffer: true,
      },
      take: 5,
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json({ success: true, offers });
  } catch (error) {
    console.error('Error fetching offers:', error);
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch offers', debug: errMsg },
      { status: 500 }
    );
  }
}
