import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only handle root path; all other routes are handled by their own layouts.
  if (pathname !== '/') {
    return NextResponse.next()
  }

  const accept = req.headers.get('accept-language') ?? ''
  // Redirect Chinese-locale browsers to /zh; everyone else to /en.
  const isCN = /\bzh(-\w+)?\b/i.test(accept)
  return NextResponse.redirect(new URL(isCN ? '/zh' : '/en', req.url))
}

export const config = {
  matcher: ['/'],
}
