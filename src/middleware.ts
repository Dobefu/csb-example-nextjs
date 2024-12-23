import { type NextRequest, NextResponse } from 'next/server'

const locale = process.env.DEFAULT_LOCALE ?? 'en'
const locales = process.env.LOCALES?.split(',') ?? ['en']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return

  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
