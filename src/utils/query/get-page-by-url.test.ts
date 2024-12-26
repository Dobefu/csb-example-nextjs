import { loadEnvFile } from 'node:process'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { getPageByUrl } from './get-page-by-url'

describe('getPageByUrl', () => {
  beforeEach(() => {
    loadEnvFile('.env.test')
  })

  afterEach(() => {
    loadEnvFile('.env.test')
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

  it('cannot fetch the homepage without a valid delivery token', async () => {
    delete process.env.CS_DELIVERY_TOKEN

    const { data, error } = await getPageByUrl('/', 'en')

    expect(data).toBeNull()
    expect(error).toBeDefined()
  })
})
