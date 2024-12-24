export default function getLocales(): { name: string; code: string }[] {
  return JSON.parse(
    process.env.LOCALES ??
      '[{"code":"en","name":"English"},{"code":"nl","name":"Dutch"}]',
  )
}
