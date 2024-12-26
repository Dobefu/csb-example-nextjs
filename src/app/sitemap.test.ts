import { loadEnvFile } from 'process'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import sitemap from './sitemap'

describe('sitemap', () => {
  beforeEach(() => {
    loadEnvFile('.env.test')
  })

  afterEach(() => {
    loadEnvFile('.env.test')
  })

  it('renders', async () => {
    const sitemapOutput = await sitemap()

    expect(sitemapOutput.length).toBeGreaterThanOrEqual(1)
    expect(sitemapOutput[0].url).toBeDefined()
    expect(sitemapOutput[0].alternates?.languages).toBeDefined()
  })

  it('returns early when the APP_HOST variable is missing', async () => {
    delete process.env.APP_HOST

    const sitemapOutput = await sitemap()

    expect(sitemapOutput).toMatchObject([])
  })
})
