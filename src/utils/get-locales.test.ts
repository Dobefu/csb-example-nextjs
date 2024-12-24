import { afterEach, describe, expect, it } from 'vitest'
import getLocales from './get-locales'

describe('get-locales', () => {
  afterEach(() => {
    process.env.MOCK_PATHNAME = '/'
    process.env.LOCALES =
      '[{"code":"en","name":"English"},{"code":"nl","name":"Dutch"}]'
  })

  it('Returns the locales', () => {
    const locales = getLocales()

    expect(locales).toBeDefined()
  })

  it('Returns the locales when the .env variable is missing', () => {
    delete process.env.LOCALES
    const locales = getLocales()

    expect(locales).toBeDefined()
  })
})
