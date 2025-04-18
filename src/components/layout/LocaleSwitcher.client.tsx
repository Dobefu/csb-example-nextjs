'use client'

import useLocale from '@/hooks/use-locale'
import { AltLocale } from '@/types/alt-locale'
import getLocales from '@/utils/get-locales'
import { logError } from '@/utils/logger'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useCallback, useMemo } from 'react'

type Props = {
  altLocales: AltLocale[]
}

type Locale = {
  code: string
  name: string
  url: string
}

export default function LocaleSwitcher({ altLocales }: Readonly<Props>) {
  const { locale: currentLocale, t } = useLocale()
  const locales = getLocales()

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const usableLocales = useMemo<Locale[]>(() => {
    const newLocales: Locale[] = []

    for (const locale of locales) {
      let altLocale: { url: string } | undefined = altLocales.find(
        (altLocale) => altLocale.locale === locale.code,
      )

      if (!altLocale && locale.code === currentLocale?.code) {
        const pathParts = pathname.split('/')
        const pathWithoutLocale = pathParts.slice(2).join('/')

        if (pathParts.length >= 2) {
          altLocale = { url: `/${pathWithoutLocale}` }
        }
      }

      if (!altLocale) {
        continue
      }

      newLocales.push({
        code: locale.code,
        name: t(`languages.${locale.code}`),
        url: altLocale.url,
      })
    }

    return newLocales
  }, [t, currentLocale, altLocales, locales, pathname])

  const isDisabled = useMemo(() => {
    if (!!searchParams.get('live_preview') && !altLocales.length) {
      return true
    }

    return false
  }, [altLocales, searchParams])

  const onLocaleSelected = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const newLocale = e.target.value
      const newLocaleObject = usableLocales.find(
        (usableLocale) => usableLocale.code === newLocale,
      )

      /* v8 ignore start */
      if (!newLocaleObject) {
        // This should never actually happen.
        logError('Failed to switch the locale')
        return
      }
      /* v8 ignore stop */

      let path = newLocaleObject.url

      if (searchParams.size) {
        path = `${path}?${searchParams}`
      }

      router.push(`/${newLocale}${path}`)
    },
    [usableLocales, router, searchParams],
  )

  return (
    <select
      aria-label={t('locale_switcher.label')}
      className="rounded-lg border p-2 shadow-inner"
      defaultValue={currentLocale?.code}
      disabled={isDisabled}
      onChange={onLocaleSelected}
    >
      {usableLocales.map((locale) => (
        <option key={locale.code} value={locale.code}>
          {locale.name}
        </option>
      ))}
    </select>
  )
}
