import { afterEach } from 'node:test'
import { describe, expect, it } from 'vitest'
import { getPageByUrl } from './get-page-by-url'

const endpoint = process.env.CS_API_ENDPOINT

describe('getPageByUrl', () => {
  afterEach(() => {
    process.env.CS_API_ENDPOINT = endpoint
  })

  it('can fetch the homepage', async () => {
    const { data, error } = await getPageByUrl('/', 'en')

    expect(data).toBeDefined()
    expect(error).toBeNull()
  })

  it('cannot fetch the homepage without an API endpoint', async () => {
    delete process.env.CS_API_ENDPOINT

    const { data, error } = await getPageByUrl('/', 'en')

    expect(data).toBeNull()
    expect(error).toBeDefined()
  })
})
