import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicOnlyRoutes = [
  "/signin",
  "/account-verification",
  "/forgotten-password",
  "/awaiting-confirmation",
];

const protectedRoutes = ["/profile"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  // Set the current path in headers for API requests and redirects after authentication
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(
    "x-current-path",
    request.nextUrl.pathname + request.nextUrl.search
  );

  // If user is authenticated and tries to access a public-only route, redirect to "/"
  if (token && publicOnlyRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is not authenticated and tries to access a protected route, redirect to signin
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(
      new URL(`/signin?returnUrl=${encodeURIComponent(pathname)}`, request.url)
    );
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
