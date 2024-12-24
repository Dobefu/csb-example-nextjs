'use client'

import { LocaleContext } from '@/app/[locale]/providers'
import getLocales from '@/utils/get-locales'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useCallback, useContext } from 'react'

export default function LocaleSwitcher() {
  const currentLocale = useContext(LocaleContext)
  const locales = getLocales()

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
    <select
      aria-label="Language"
      className="rounded-lg border p-2 shadow-inner"
      defaultValue={currentLocale}
      onChange={onLocaleSelected}
    >
      {locales.map((locale) => (
        <option key={locale.code} value={locale.code}>
          {locale.name}
        </option>
      ))}
    </select>
  )
}
