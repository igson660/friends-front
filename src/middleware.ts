import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_KEY } from "./config/constants";

const PROTECTED = [
  "/dashboard",
  "/network",
  "/map",
  "/profile",
  "/link-profile",
];

const PUBLIC_AUTH = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(SESSION_COOKIE_KEY as string)?.value;

  const isProtected = PROTECTED.some((route) => pathname.startsWith(route));
  const isPublicAuth = PUBLIC_AUTH.some((route) => pathname.startsWith(route));

  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);

    return NextResponse.redirect(url);
  }

  if (isPublicAuth && token) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
