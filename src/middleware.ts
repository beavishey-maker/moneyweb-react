import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (req.nextUrl.pathname === '/admin/login') return NextResponse.next()
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
