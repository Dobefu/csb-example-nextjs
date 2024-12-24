'use client'

import { LocaleContext } from '@/app/[locale]/providers'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useCallback, useContext } from 'react'

export default function LocaleSwitcher() {
  const currentLocale = useContext(LocaleContext)
  const locales = JSON.parse(process.env.LOCALES!)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onLocaleSelected = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const newLocale = e.target.value
      let path = pathname.replace(`/${currentLocale}`, '')

      if (searchParams.size) {
        path = `${path}?${searchParams}`
      }

      router.push(`/${newLocale}/${path}`)
    },
    [router, currentLocale, pathname, searchParams],
  )

  return (
    <select defaultValue={currentLocale} onChange={onLocaleSelected}>
      {locales.map((locale: { code: string; name: string }) => (
        <option key={locale.code} value={locale.code}>
          {locale.name}
        </option>
      ))}
    </select>
  )
}
