import type { Metadata } from 'next'
import getConfig from 'next/config'
import { TemplateString } from 'next/dist/lib/metadata/types/metadata-types'
import { Geist } from 'next/font/google'
import './globals.css'
import Providers from './providers'

// Make the layout dynamic, to ensure that CSP nonces get generated on every page load.
export const dynamic = 'force-dynamic'

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const { publicRuntimeConfig } = getConfig()
const appName = publicRuntimeConfig.appName || ''

export const metadata: Metadata = {
  title: {
    default: appName,
    template: `%s | ${appName}`,
  } satisfies TemplateString,
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const locale = (await params).locale

  return (
    <html className="h-full" lang={locale}>
      <body
        className={`${geistSans.variable} flex min-h-full flex-col font-sans antialiased`}
      >
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  )
}
