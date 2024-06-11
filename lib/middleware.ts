import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import options from "../app/api/auth/[...nextauth]/options";

export async function middleware(request: NextRequest) {
  const session = await getServerSession(options);

  const { pathname } = request.nextUrl;

  if (!session) {
    if (pathname.startsWith("/journal")) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    // Allow access to sign-in and sign-up pages without a session
    if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
      return NextResponse.redirect(new URL("/journal", request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/journal/:path*", "/sign-in", "/sign-up"],
};
