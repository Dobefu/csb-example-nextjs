import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const locale = process.env.DEFAULT_LOCALE ?? 'en'
  const locales = JSON.parse(process.env.LOCALES!)

  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale: { code: string; name: string }) =>
      pathname.startsWith(`/${locale.code}/`) || pathname === `/${locale.code}`,
  )

  if (pathnameHasLocale) return NextResponse.next()

  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
