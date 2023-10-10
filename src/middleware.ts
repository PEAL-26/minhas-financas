import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = ["/login", "/inscrever-se"];
const PUBLIC_ROUTES = ["/", "/termos", ...AUTH_ROUTES];

export function middleware(req: NextRequest, res: NextResponse) {
  const user = req.cookies.get("user")?.value;
  const loginURL = new URL("/login", req.url);
  const dashboardURL = new URL("/dashboard", req.url);
  const { pathname } = req.nextUrl;

  console.log({
    PUBLIC_ROUTES: PUBLIC_ROUTES.includes(pathname),
    loginURL,
    dashboardURL,
    pathname,
  });

  if (!user) {
    if (PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(loginURL);
  }

  if (AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(dashboardURL);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
