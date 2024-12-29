import { Locale } from '@/types/locale'

export default function getLocales(): Locale[] {
  return JSON.parse(
    process.env.LOCALES ??
      '[{"code":"en","name":"English"},{"code":"nl","name":"Dutch"}]',
  )
}
