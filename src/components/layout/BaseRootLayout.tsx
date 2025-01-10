import '@/app/globals.css'
import getLocales from '@/utils/get-locales'
import { logError } from '@/utils/logger'
import { getTranslations } from '@/utils/query/get-translations'
import { Geist } from 'next/font/google'
import { notFound } from 'next/navigation'
import Providers from './providers'

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const pageLocale = (await params).locale
  const locales = getLocales()
  const locale = locales.find((loc) => (loc.code = pageLocale))!

  const { data: translations, error } = await getTranslations(locale.code)

  if (error) {
    logError(`Could not get the translations: ${error}`)
    notFound()
  }

  return (
    <html className="h-full" lang={locale.code}>
      <body
        className={`${geistSans.variable} flex min-h-full flex-col font-sans antialiased`}
      >
        <Providers locale={locale} translations={translations}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
