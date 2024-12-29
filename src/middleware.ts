import { NextURL } from 'next/dist/server/web/next-url'
import { type NextRequest, NextResponse } from 'next/server'
import getLocales from './utils/get-locales'

export function middleware(request: NextRequest) {
  const redirectUrl = handleLocaleDetection(request)

  if (redirectUrl) {
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

function handleLocaleDetection(request: NextRequest): NextURL | undefined {
  const locale = process.env.DEFAULT_LOCALE ?? 'en'
  const locales = getLocales()

  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale: { code: string; name: string }) =>
      pathname.startsWith(`/${locale.code}/`) || pathname === `/${locale.code}`,
  )

  if (pathnameHasLocale) return

  request.nextUrl.pathname = `/${locale}${pathname}`
  return request.nextUrl
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
