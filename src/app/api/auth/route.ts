import { NextResponse } from 'next/server';
import { AUTH_COOKIE, SESSION_MAX_AGE_SECONDS, createSessionToken } from '@/lib/adminAuth';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true });
      // Signed, expiring token instead of a fixed value anyone could forge in devtools.
      response.cookies.set({
        name: AUTH_COOKIE,
        value: await createSessionToken(),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: SESSION_MAX_AGE_SECONDS,
      });
      return response;
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
