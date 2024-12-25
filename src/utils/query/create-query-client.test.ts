import { describe, expect, it } from 'vitest'
import { createQueryClient } from './create-query-client'

describe('createQueryClient', () => {
  it('creates a QueryClient', () => {
    const client = createQueryClient()

    expect(client).toBeDefined()
    expect(
      client.getDefaultOptions().queries?.staleTime,
    ).toBeGreaterThanOrEqual(1000)
  })

  it('creates a QueryClient without any cache', () => {
    process.env.DISABLE_QUERY_CACHE = '1'

    const client = createQueryClient()

    expect(client).toBeDefined()
    expect(client.getDefaultOptions().queries?.staleTime).toBe(1)

    delete process.env.DISABLE_QUERY_CACHE
  })
})
