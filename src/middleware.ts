import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextURL } from 'next/dist/server/web/next-url'
import { type NextRequest, NextResponse } from 'next/server'
import getLocales from './utils/get-locales'

export function middleware(request: NextRequest) {
  const redirectUrl = handleLocaleDetection(request)

  if (redirectUrl) {
    return NextResponse.redirect(redirectUrl)
  }

  const response = getCspResponse(request)

  return response
}

function handleLocaleDetection(request: NextRequest): NextURL | undefined {
  const defaultLocale = process.env.DEFAULT_LOCALE ?? 'en'
  const locales = getLocales()

  const localeCodes = locales.map((locale) => locale.code)

  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale: { code: string; name: string }) =>
      pathname.startsWith(`/${locale.code}/`) ||
      pathname === `/${locale.code}` ||
      pathname.startsWith(`/preview/${locale.code}/`) ||
      pathname === `/preview/${locale.code}`,
  )

  if (pathnameHasLocale) return

  const headers: Record<string, string> = { 'accept-language': 'en' }
  request.headers.forEach((value, key) => (headers[key] = value))

  const languages = new Negotiator({ headers }).languages()
  const matchedLocale = match(languages, localeCodes, defaultLocale)

  request.nextUrl.pathname = `/${matchedLocale}${pathname}`

  if (request.nextUrl.pathname.startsWith('/preview')) {
    request.nextUrl.pathname = `preview/${request.nextUrl.pathname}`
  }

  return request.nextUrl
}

function getCspResponse(request: Request): NextResponse {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  const csp: Record<string, string[]> = {
    'default-src': ["'self'"],
    'script-src': ["'self'", `'nonce-${nonce}'`, "'strict-dynamic'"],
    'style-src': ["'self'", `'nonce-${nonce}'`],
    'img-src': ["'self'", 'blob:', 'data:'],
    'font-src': ["'self'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ['https://*.contentstack.com'],
  }

  // NextJS inlines styles for the dev indicators in development mode.
  // Unfortunately, they do not use nonces, so we have to use unsafe-inline.
  if (process.env.NODE_ENV !== 'production') {
    csp['style-src'].splice(1, 1)
    csp['style-src'].push("'unsafe-inline'")
    csp['upgrade-insecure-requests'] = []
  }

  const cspString = parseCsp(csp)

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  response.headers.set('Content-Security-Policy', cspString)

  return response
}

function parseCsp(csp: Record<string, string[]>): string {
  const output = []

  for (const [key, value] of Object.entries(csp)) {
    output.push(`${key} ${value.join(' ')}`.trimEnd())
  }

  return output.join('; ') + ';'
}

export const config = {
  matcher: [
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.+.svg).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
