import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const token = request.cookies.get("civora-auth-token")
  const { pathname } = request.nextUrl

  // If not authenticated and trying to access dashboard
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If authenticated and trying to access login
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.png|images|avatars|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
