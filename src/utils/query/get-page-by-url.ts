import { createQueryClient } from './create-query-client'

export async function getPageByUrl<T>(pageUrl: string, locale: string) {
  const url = `${process.env.CS_API_ENDPOINT ?? ''}/get-entry-by-url?url=${pageUrl}&locale=${locale}`
  console.log(url)
  const queryClient = createQueryClient()
  const query = {
    queryKey: ['getPageByUrl', url],
    queryFn: async () => {
      try {
        const response = await fetch(url)
        return await response.json()
      } catch (error) {
        return {
          data: null,
          error,
        }
      }
    },
  }

  return await queryClient.fetchQuery<T>(query)
}
