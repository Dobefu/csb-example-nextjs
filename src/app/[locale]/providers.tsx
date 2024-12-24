'use client'

import React, { createContext } from 'react'

export const LocaleContext = createContext<string>('')

export default function Providers({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode
  locale: string
}>) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  )
}
