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
})
