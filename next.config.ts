import type { NextConfig } from 'next'
import { fetchLocales } from './src/fetch-locales'

module.exports = async () => {
  const { defaultLocale, locales } = await fetchLocales()

  const nextConfig: NextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    poweredByHeader: false,
    env: {
      DEFAULT_LOCALE: defaultLocale ?? 'en',
      LOCALES: locales.join(',') ?? ['en'],
    },
    publicRuntimeConfig: {
      appName: process.env.APP_NAME ?? '',
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
          ],
        },
      ]
    },
  }

  return nextConfig
}
