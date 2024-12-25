import { RoutableEntryResponse } from '@/types/routable-entry-response'
import { createQueryClient } from './create-query-client'

export async function getPageByUrl(
  pageUrl: string,
  locale: string,
): Promise<RoutableEntryResponse> {
  const endpoint = process.env.CS_API_ENDPOINT ?? ''

  if (!endpoint) {
    return {
      data: null,
      error: 'CS_API_ENDPOINT is not valid',
    } satisfies RoutableEntryResponse
  }

  const url = `${endpoint}/get-entry-by-url?url=${pageUrl}&locale=${locale}`

  const queryClient = createQueryClient()
  const query = {
    queryKey: ['getPageByUrl', url],
    queryFn: async () => {
      const response = await fetch(url)
      return await response.json()
    },
  }

  return await queryClient.fetchQuery<RoutableEntryResponse>(query)
}
