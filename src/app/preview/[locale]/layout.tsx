import BaseRootLayout from '@/components/layout/BaseRootLayout'

// Make the layout dynamic, to ensure that CSP nonces get generated on every page load.
export const dynamic = 'force-dynamic'

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  return <BaseRootLayout params={params}>{children}</BaseRootLayout>
}
