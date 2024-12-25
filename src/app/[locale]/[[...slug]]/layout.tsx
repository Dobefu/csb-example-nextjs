import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import React from 'react'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string; slug?: string[] }>
}

export default async function Layout({ children, params }: Readonly<Props>) {
  return (
    <div className="flex flex-1 flex-col justify-between gap-4">
      <Header />

      <main className="flex-1 px-8" id="main-content">
        {children}
      </main>

      <Footer />
    </div>
  )
}
