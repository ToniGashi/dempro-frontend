import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicOnlyRoutes = [
  "/signin",
  "/account-verification",
  "/forgotten-password",
  "/awaiting-confirmation",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  // If user is authenticated and tries to access a public-only route, redirect to "/"
  if (token && publicOnlyRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/signin",
    "/account-verification",
    "/forgotten-password",
    "/awaiting-confirmation",
  ],
};
