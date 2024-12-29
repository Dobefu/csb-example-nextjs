import { Locale } from '@/types/locale'
import { describe, expect, it, vi } from 'vitest'
import useLocale from './use-locale'

vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...(actual as object),
    useContext: () => ({
      locale: {
        code: 'en',
        name: 'English',
      } satisfies Locale,
      translations: {
        'test.source': 'Translation',
      } satisfies Record<string, string>,
    }),
  }
})

describe('useLocale', () => {
  it('renders', () => {
    const { locale, t } = useLocale()

    expect(locale).toBeDefined()
    expect(t).toBeDefined()
    expect(t('test.source')).toBe('Translation')
    expect(t('test.bogus')).toBe('⚠ test.bogus ⚠')
  })
})
