import { logError } from '@/utils/logger'
import type { MetadataRoute } from 'next'

type ApiResponse = {
  data: Record<
    string,
    {
      uid: string
      locale: string
      url: string
      alt_locales: Record<
        string,
        {
          uid: string
          content_type: string
          locale: string
          slug: string
          url: string
        }
      >
    }
  > | null
  error: string | null
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = process.env.APP_HOST ?? ''
  const defaultLocale = process.env.DEFAULT_LOCALE ?? 'en'

  if (!host) {
    logError('APP_HOST is empty or undefined')
    return []
  }

  const { data, error } = await fetchSitemapData()

  if (!data || error) {
    logError(error!)
    return []
  }

  return Object.values(data).map((entry) => {
    const altLocales: Record<string, string> = {}

    for (const altLocale of Object.values(entry.alt_locales)) {
      altLocales[altLocale.locale] =
        `${host}/${altLocale.locale}${altLocale.url}`
    }

    return {
      url: `${host}/${defaultLocale}${entry.url}`,
      alternates: { languages: altLocales },
    }
  })
}

async function fetchSitemapData(): Promise<ApiResponse> {
  const endpoint = process.env.CS_API_ENDPOINT
  const deliveryToken = process.env.CS_DELIVERY_TOKEN

  if (!endpoint) {
    return { data: null, error: 'CS_API_ENDPOINT is not set' }
  }

  if (!deliveryToken) {
    return { data: null, error: 'CS_DELIVERY_TOKEN is not set' }
  }

  const response = await fetch(`${endpoint}/sitemap-data`, {
    headers: {
      Authorization: deliveryToken,
    },
  })

  if (!response.ok) {
    return { data: null, error: await response.json() }
  }

  const { data, error }: ApiResponse = await response.json()

  if (error) {
    return { data: null, error }
  }

  return { data, error: null }
}
