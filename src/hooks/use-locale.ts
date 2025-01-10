import { LocaleContext } from '@/components/layout/providers'
import { Locale } from '@/types/locale'
import { logWarning } from '@/utils/logger'
import { useContext } from 'react'

export default function useLocale(): {
  locale: Locale
  t: (source: string) => string
} {
  const { locale, translations } = useContext(LocaleContext)

  function t(source: string): string {
    if (!translations || !(source in translations)) {
      logWarning(`The translation source "${source}" has no translation`)
      return `⚠ ${source} ⚠`
    }

    return translations[source]
  }

  return { locale: locale!, t }
}
