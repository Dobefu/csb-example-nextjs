import { RoutableEntryResponse } from '@/types/routable-entry-response'
import { createQueryClient } from './create-query-client'

export async function getPageByUrl(
  pageUrl: string,
  locale: string,
): Promise<RoutableEntryResponse> {
  const endpoint = process.env.CS_API_ENDPOINT ?? ''
  const deliveryToken = process.env.CS_DELIVERY_TOKEN ?? ''

  if (!endpoint) {
    return {
      data: null,
      error: 'CS_API_ENDPOINT is not valid',
    } satisfies RoutableEntryResponse
  }

  const url = `${endpoint}/get-entry-by-url?url=${pageUrl}&locale=${locale}`

  const queryClient = createQueryClient()
  const query = {
    queryKey: ['getPageByUrl', url, deliveryToken],
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

  return await queryClient.fetchQuery<RoutableEntryResponse>(query)
}
