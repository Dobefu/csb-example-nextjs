import { QueryClient } from '@tanstack/react-query'

export const createQueryClient = () => {
  const secondsInFiveMinutes = 1000 * 360
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime:
          process.env.NODE_ENV === 'production' ? 1 : secondsInFiveMinutes,
      },
    },
  })
}
