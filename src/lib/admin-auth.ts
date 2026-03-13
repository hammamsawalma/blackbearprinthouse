import { auth } from '@/auth';
import { NextResponse } from 'next/server';

/**
 * Verify that the request is from an authenticated admin user
 * Returns the session if valid, or a 401/403 response
 */
export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), session: null };
  }

  if (session.user.role !== 'ADMIN') {
    return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }), session: null };
  }

  return { error: null, session };
}
