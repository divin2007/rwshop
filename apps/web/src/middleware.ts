import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Very basic subdomain routing placeholder
  // If we have something like market1.localhost:3000
  if (hostname.includes('.') && !hostname.startsWith('www.') && !hostname.includes('localhost')) {
    const slug = hostname.split('.')[0];
    if (slug) {
      return NextResponse.rewrite(new URL(`/markets/${slug}${url.pathname}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
