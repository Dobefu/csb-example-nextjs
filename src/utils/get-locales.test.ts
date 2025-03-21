import { loadEnvFile } from 'node:process'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import getLocales from './get-locales'

describe('get-locales', () => {
  beforeEach(() => {
    loadEnvFile('.env.test')
  })

  afterEach(() => {
    loadEnvFile('.env.test')
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
