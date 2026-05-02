import { auth } from "@/auth"
import { NextResponse } from "next/server"

export async function proxy(request) {
  // We can let NextAuth handle the check if it supports the new proxy export,
  // or manually call auth() if it's a wrapper.
  // For now, let's fix the export name error first.
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     * - signup (signup page)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)",
  ],
}
