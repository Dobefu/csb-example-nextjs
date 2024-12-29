'use client'

import { Locale } from '@/types/locale'
import React, { createContext } from 'react'

export const LocaleContext = createContext<{
  locale?: Locale
  translations: Record<string, string> | null
}>({ translations: null })

export default function Providers({
  children,
  locale,
  translations,
}: Readonly<{
  children: React.ReactNode
  locale: Locale
  translations: Record<string, string> | null
}>) {
  return (
    <LocaleContext.Provider value={{ locale, translations }}>
      {children}
    </LocaleContext.Provider>
  )
}
