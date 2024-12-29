'use client'

import { Locale } from '@/types/locale'
import React, { createContext } from 'react'

export const LocaleContext = createContext<{
  locale?: Locale
}>({})

export default function Providers({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode
  locale: Locale
}>) {
  return (
    <LocaleContext.Provider value={{ locale }}>
      {children}
    </LocaleContext.Provider>
  )
}
