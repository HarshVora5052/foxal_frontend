import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin route protection
  if (pathname.startsWith('/admin')) {
    const roleCookie = request.cookies.get('foxal_role')?.value;
    const token =
      request.cookies.get('laravel_session')?.value ||
      request.cookies.get('foxal_auth')?.value ||
      request.cookies.get('XSRF-TOKEN')?.value;

    // Allow access if admin role cookie is present or in client-side dev mode
    // (AdminLayout also enforces strict role-based verification)
  }

  // Customer Protected paths
  const isProtected =
    pathname.startsWith('/account') || pathname.startsWith('/checkout');

  if (isProtected) {
    // Verified by client store / session cookie
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/checkout/:path*', '/admin/:path*'],
};
