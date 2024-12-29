'use client'

import { Locale } from '@/types/locale'
import React, { createContext, useMemo } from 'react'

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
  const localeContextValue = useMemo(
    () => ({ locale, translations }),
    [locale, translations],
  )

  return (
    <LocaleContext.Provider value={localeContextValue}>
      {children}
    </LocaleContext.Provider>
  )
}
