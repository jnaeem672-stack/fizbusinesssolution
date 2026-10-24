import { NextResponse, type NextRequest } from 'next/server';

/**
 * Runs only for /ar and /ar/*. It adds one request header so the 404 page for an unknown Arabic
 * address (app/global-not-found.tsx) can answer in Arabic. Pages, caching and tracking are unchanged.
 */
export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-fizbs-lang', 'ar');
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/ar', '/ar/:path*'],
};
