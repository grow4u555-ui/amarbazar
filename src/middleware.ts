import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnAuth = req.nextUrl.pathname.startsWith('/auth');
  const isOnSeller = req.nextUrl.pathname.startsWith('/seller');
  const isOnAdmin = req.nextUrl.pathname.startsWith('/admin');
  const isApiAuth = req.nextUrl.pathname.startsWith('/api/auth');
  const isApiSeller = req.nextUrl.pathname.startsWith('/api/seller');
  const isApiAdmin = req.nextUrl.pathname.startsWith('/api/admin');

  // Allow API auth routes
  if (isApiAuth) {
    return NextResponse.next();
  }

  // Redirect logged in users away from auth pages
  if (isLoggedIn && isOnAuth) {
    const callbackUrl = req.nextUrl.searchParams.get('callbackUrl') || '/';
    return NextResponse.redirect(new URL(callbackUrl, req.nextUrl));
  }

  // Protect seller routes
  if (isOnSeller || isApiSeller) {
    if (!isLoggedIn) {
      const callbackUrl = req.nextUrl.pathname + req.nextUrl.search;
      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, req.nextUrl)
      );
    }
    if (req.auth?.user?.role !== 'SELLER' && req.auth?.user?.role !== 'ADMIN' && req.auth?.user?.role !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/seller/register', req.nextUrl));
    }
  }

  // Protect admin routes
  if (isOnAdmin || isApiAdmin) {
    if (!isLoggedIn) {
      const callbackUrl = req.nextUrl.pathname + req.nextUrl.search;
      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, req.nextUrl)
      );
    }
    if (req.auth?.user?.role !== 'ADMIN' && req.auth?.user?.role !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};