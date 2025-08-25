import { COOKIES } from '@repo/constants/cookies';
import { NextRequest, NextResponse } from 'next/server';

const AUTH_ROUTES = ['/login', '/register'];
const PUBLIC_ROUTES = ['/', '/terms'];

export function middleware(req: NextRequest, res: NextResponse) {
  const isAuthenticated =  "token_teste"// !!req.cookies.get(COOKIES.TOKEN)?.value;
  const loginURL = new URL('/login', req.url);
  const dashboardURL = new URL('/dashboard', req.url);
  const { pathname } = req.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (!isAuthenticated && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(loginURL);
  }

  if (isAuthenticated && !isPublicRoute && isAuthRoute) {
    return NextResponse.redirect(dashboardURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
