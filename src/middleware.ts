import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Only protect routes inside /admin/leads
  if (url.pathname.startsWith('/admin/leads')) {
    const authCookie = request.cookies.get('coderon_auth');
    
    // If no cookie or wrong cookie, kick them to the login page
    if (!authCookie || authCookie.value !== 'authenticated') {
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/leads/:path*'],
};