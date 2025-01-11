import BaseRootLayout from '@/components/layout/BaseRootLayout'
import type { Metadata } from 'next'
import getConfig from 'next/config'
import { TemplateString } from 'next/dist/lib/metadata/types/metadata-types'

// Make the layout dynamic, to ensure that CSP nonces get generated on every page load.
export const dynamic = 'force-dynamic'

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
  return <BaseRootLayout params={params}>{children}</BaseRootLayout>
}
