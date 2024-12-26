import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Home, { generateMetadata } from './page'

describe('Home', () => {
  afterEach(() => {
    cleanup()
  })

  it('Renders normally', async () => {
    render(
      await Home(
        await new Promise<(typeof Home)['arguments']>((resolve) => {
          resolve({
            params: {
              locale: 'en',
              slug: [''],
            },
          })
        }),
      ),
    )

    expect(screen).toBeDefined()
  })

  it('Renders normally on a 404', async () => {
    render(
      await Home(
        await new Promise<(typeof Home)['arguments']>((resolve) => {
          resolve({
            params: {
              locale: 'en',
              slug: ['bogus'],
            },
          })
        }),
      ),
    )

    expect(screen).toBeDefined()
  })

  it('Renders without all optional parameters', async () => {
    render(
      await Home(
        await new Promise<(typeof Home)['arguments']>((resolve) => {
          resolve({ params: { locale: 'en' } })
        }),
      ),
    )

    expect(screen).toBeDefined()
  })

  it('generates metadata correctly', async () => {
    const metadata = await generateMetadata(
      await new Promise<(typeof Home)['arguments']>((resolve) => {
        resolve({ params: { locale: 'en' } })
      }),
    )

    expect(metadata).toBeDefined()
  })

  it('returns early on error', async () => {
    const metadata = await generateMetadata(
      await new Promise<(typeof Home)['arguments']>((resolve) => {
        resolve({ params: { locale: 'en', slug: ['bogus'] } })
      }),
    )

    expect(metadata).toBeUndefined()
  })
})
