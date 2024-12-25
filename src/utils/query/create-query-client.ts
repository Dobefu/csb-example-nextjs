import { QueryClient } from '@tanstack/react-query'

export function createQueryClient() {
  const secondsInFiveMinutes = 1000 * 360

  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime:
          process.env.DISABLE_QUERY_CACHE === '1' ? 1 : secondsInFiveMinutes,
      },
    },
  })
}
