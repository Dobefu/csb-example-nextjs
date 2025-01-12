import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

// Make the layout dynamic, to ensure that CSP nonces get generated on every page load.
export const dynamic = 'force-dynamic'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string; slug?: string[] }>
}

export default async function Layout({ children, params }: Readonly<Props>) {
  const locale = (await params).locale
  const headersList = await headers()
  const dest = headersList.get('sec-fetch-dest')

  if (dest !== 'iframe') {
    redirect(`/${locale}`)
  }

  return (
    <div className="flex flex-1 flex-col justify-between gap-4">
      <Header altLocales={[]} />

      <Breadcrumbs breadcrumbs={[]} />

      <main className="flex-1 px-8" id="main-content">
        {children}
      </main>

      <Footer />
    </div>
  )
}
