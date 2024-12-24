import { describe, expect, it } from 'vitest'
import robots from './robots'

describe('robots', () => {
  it('renders', () => {
    const file = robots()

    expect(file.sitemap).toBe('http://localhost:3000/sitemap.xml')
    expect(file.rules).toBeDefined()
  })
})
