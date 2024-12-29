import { LocaleContext } from '@/app/[locale]/providers'
import { Locale } from '@/types/locale'
import { useContext } from 'react'

export default function useLocale(): {
  locale: Locale
  t: (source: string) => string
} {
  const { locale, translations } = useContext(LocaleContext)

  function t(source: string): string {
    if (!translations) {
      return source
    }

    if (!(source in translations)) {
      return source
    }

    return translations[source]
  }

  return { locale: locale!, t }
}
