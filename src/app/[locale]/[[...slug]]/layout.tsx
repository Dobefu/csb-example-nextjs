import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { logError } from '@/utils/logger'
import { getPageByUrl } from '@/utils/query/get-page-by-url'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string; slug?: string[] }>
}

export default async function Layout({ children, params }: Readonly<Props>) {
  const slugParts = (await params).slug ?? ['']
  const url = `/${slugParts.join('/')}`
  const locale = (await params).locale

  const { data, error } = await getPageByUrl(url, locale)

  if (!data || error) {
    logError(`Cannot get the page: ${error}`)
    return notFound()
  }

  return (
    <div className="flex flex-1 flex-col justify-between gap-4">
      <Header altLocales={data.alt_locales} />

      <main className="flex-1 px-8" id="main-content">
        {children}
      </main>

      <Footer />
    </div>
  )
}
