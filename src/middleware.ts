import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE, verifySessionToken } from '@/lib/adminAuth';

// Protects the outreach dashboard and every API route that reads leads or sends email.
// Cron routes (hunter/enrich/followup) use CRON_SECRET instead; the Resend webhook uses
// its Svix signature.
export async function middleware(request: NextRequest) {
  const ok = await verifySessionToken(request.cookies.get(AUTH_COOKIE)?.value);
  if (ok) return NextResponse.next();

  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const url = request.nextUrl.clone();
  url.pathname = '/admin/login/';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin/leads(.*)', '/api/leads(.*)', '/api/pitch(.*)', '/api/outreach(.*)'],
};
