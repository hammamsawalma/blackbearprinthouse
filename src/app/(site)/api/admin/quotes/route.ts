import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';

/**
 * GET /api/admin/quotes — List all quote requests
 */
export async function GET(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const searchParams = req.nextUrl.searchParams;
  const status = searchParams.get('status');

  try {
    const where = status ? { status } : {};

    const quotes = await prisma.quoteRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ quotes }, { status: 200 });
  } catch (err) {
    console.error('Admin Quotes GET Error:', err);
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}
