import { describe, expect, it } from 'vitest'
import robots from './robots'

describe('robots', () => {
  it("doesn't redirect for valid locales", () => {
    const file = robots()

    expect(file.sitemap).toBe('http://localhost:3000/sitemap.xml')
    expect(file.rules).toBeDefined()
  })
})
