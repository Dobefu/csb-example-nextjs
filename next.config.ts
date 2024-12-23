import type { NextConfig } from 'next'
import { fetchLocales } from './src/fetch-locales'

module.exports = async () => {
  const { defaultLocale, locales } = await fetchLocales()

  const nextConfig: NextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    poweredByHeader: false,
    i18n: {
      defaultLocale,
      locales,
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
