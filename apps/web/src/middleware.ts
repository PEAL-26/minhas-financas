import { NextRequest, NextResponse } from 'next/server';

const AUTH_ROUTES = ['/login', '/inscrever-se'];
const PUBLIC_ROUTES = ['/', '/termos', ...AUTH_ROUTES];

export function middleware(req: NextRequest, res: NextResponse) {
  const isAuthenticated = req.cookies.get('user')?.value;
  const loginURL = new URL('/login', req.url);
  const dashboardURL = new URL('/dashboard', req.url);
  const { pathname } = req.nextUrl;

  if (!isAuthenticated && !PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(loginURL);
  }

  if (isAuthenticated && AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(dashboardURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
