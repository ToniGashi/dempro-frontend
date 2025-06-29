export { auth as middleware } from "./auth";

export const config = {
  matcher: ["/signin/:path*", "/signup/:path*"],
};
