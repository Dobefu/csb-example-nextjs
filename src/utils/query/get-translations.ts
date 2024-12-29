import { RoutableEntryResponse } from '@/types/routable-entry-response'
import { createQueryClient } from './create-query-client'

interface Response {
  data: Record<string, string> | null
  error: string | null
}

export async function getTranslations(locale: string): Promise<Response> {
  const endpoint = process.env.CS_API_ENDPOINT ?? ''
  const deliveryToken = process.env.CS_DELIVERY_TOKEN ?? ''

  if (!endpoint) {
    return {
      data: null,
      error: 'CS_API_ENDPOINT is not valid',
    } satisfies RoutableEntryResponse
  }

  const url = `${endpoint}/translations?locale=${locale}`

  const queryClient = createQueryClient()
  const query = {
    queryKey: ['getTranslations', url, deliveryToken],
    queryFn: async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: deliveryToken,
        },
      })
      return await response.json()
    },
  }

  return await queryClient.fetchQuery<Response>(query)
}
