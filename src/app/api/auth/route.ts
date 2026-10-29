import { NextResponse } from 'next/server';
import { AUTH_COOKIE, SESSION_MAX_AGE_SECONDS, createSessionToken, safeEqual } from '@/lib/adminAuth';

// A wrong password waits a moment before answering, so guessing it by brute force is slow.
const FAIL_DELAY_MS = 800;

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const expected = process.env.ADMIN_PASSWORD;

    if (expected && typeof password === 'string' && safeEqual(password, expected)) {
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

    await new Promise((r) => setTimeout(r, FAIL_DELAY_MS));
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
