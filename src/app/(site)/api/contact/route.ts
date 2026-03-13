import { NextRequest, NextResponse } from 'next/server';
import { formLimiter, getClientIp } from '@/lib/rate-limit';
import { validateContactInput } from '@/lib/validate';

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
    const result = validateContactInput(body);
    if (!result.valid) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    const { name, email, phone, subject, message } = result.data;

    // In production, this would send via AWS SES
    console.log('📧 New Contact Message:', {
      from: `${name} <${email}>`,
      phone,
      subject,
      message,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: 'Message received successfully' }, { status: 200 });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
