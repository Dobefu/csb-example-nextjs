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
  locales: { code: string; name: string }[]
}> {
  const endpoint = process.env.CS_API_ENDPOINT
  const deliveryToken = process.env.CS_DELIVERY_TOKEN
  const defaultLocales = [{ code: 'en', name: 'English' }]

  if (!endpoint || !deliveryToken) {
    return {
      defaultLocale: 'en',
      locales: defaultLocales,
    }
  }

  const response = await fetch(`${endpoint}/locales`, {
    headers: {
      Authorization: deliveryToken,
    },
  })

  if (!response.ok) {
    return {
      defaultLocale: 'en',
      locales: defaultLocales,
    }
  }

  const { data, error }: ApiResponse = await response.json()

  if (error) {
    return {
      defaultLocale: 'en',
      locales: defaultLocales,
    }
  }

  let defaultLocale = 'en'

  const locales = data.locales.map((locale) => {
    if (!locale.fallback_locale) {
      defaultLocale = locale.code
    }

    return { code: locale.code, name: locale.name }
  })

  return { defaultLocale, locales }
}
