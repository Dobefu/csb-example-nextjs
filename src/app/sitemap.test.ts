import { describe, expect, it } from 'vitest'
import sitemap from './sitemap'

describe('sitemap', () => {
  it('renders', async () => {
    const sitemapOutput = await sitemap()

    expect(sitemapOutput.length).toBeGreaterThanOrEqual(1)
    expect(sitemapOutput[0].url).toBeDefined()
    expect(sitemapOutput[0].alternates?.languages).toBeDefined()
  })
})
