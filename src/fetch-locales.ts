type ApiResponse = {
  data: {
    locales: {
      code: string
      fallback_locale: string
      name: string
    }[]
  }
  error: string | null
}

export async function fetchLocales(): Promise<{
  defaultLocale: string
  locales: string[]
}> {
  const endpoint = process.env.CS_API_ENDPOINT
  const deliveryToken = process.env.CS_DELIVERY_TOKEN

  if (!endpoint || !deliveryToken) {
    return {
      defaultLocale: 'en',
      locales: ['en'],
    }
  }

  const response = await fetch(`${endpoint}/locales`, {
    headers: {
      authorization: deliveryToken,
    },
  })

  if (!response.ok) {
    return {
      defaultLocale: 'en',
      locales: ['en'],
    }
  }

  const { data, error }: ApiResponse = await response.json()

  if (error) {
    return {
      defaultLocale: 'en',
      locales: ['en'],
    }
  }

  let defaultLocale = 'en'

  const locales = data.locales.map((locale) => {
    if (!locale.fallback_locale) {
      defaultLocale = locale.code
    }

    return locale.code
  })

  return { defaultLocale, locales }
}
