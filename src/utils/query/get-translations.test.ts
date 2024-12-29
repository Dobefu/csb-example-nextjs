import { loadEnvFile } from 'node:process'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { getTranslations } from './get-translations'

describe('getTranslations', () => {
  beforeEach(() => {
    loadEnvFile('.env.test')
  })

  afterEach(() => {
    loadEnvFile('.env.test')
  })

  it('can fetch the translations', async () => {
    const { data, error } = await getTranslations('en')

    expect(data).toBeDefined()
    expect(error).toBeNull()
  })

  it('cannot fetch the translations without an API endpoint', async () => {
    delete process.env.CS_API_ENDPOINT

    const { data, error } = await getTranslations('en')

    expect(data).toBeNull()
    expect(error).toBeDefined()
  })

  it('cannot fetch the translations without a delivery token', async () => {
    delete process.env.CS_DELIVERY_TOKEN

    const { data, error } = await getTranslations('en')

    expect(data).toBeNull()
    expect(error).toBeDefined()
  })
})
