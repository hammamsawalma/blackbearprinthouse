import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { formLimiter, getClientIp } from '@/lib/rate-limit';
import { validateQuoteInput } from '@/lib/validate';

export async function POST(req: NextRequest) {
  // ── Rate Limiting ──
  const ip = getClientIp(req);
  const { success: allowed } = formLimiter.check(ip, 5);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a minute.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  try {
    const body = await req.json();

    // ── Input Validation ──
    const result = validateQuoteInput(body);
    if (!result.valid) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    const { name, email, phone, company, serviceType, description, quantity } = result.data;

    const quote = await prisma.quoteRequest.create({
      data: {
        name,
        email,
        phone,
        company: company || null,
        serviceType,
        description,
        quantity: quantity || null,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ success: true, id: quote.id }, { status: 201 });
  } catch (error) {
    console.error('Quote API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
