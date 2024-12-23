import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Home from './page'

describe('Home', () => {
  afterEach(() => {
    cleanup()
  })

  it('Renders normally', async () => {
    render(
      await Home({
        params: { locale: 'en', slug: ['test'] } as unknown as Promise<
          (typeof Home)['arguments']
        >,
      }),
    )

    expect(screen.getByText('/test')).toBeDefined()
  })

  it('Renders without all optional parameters', async () => {
    render(
      await Home({
        params: { locale: 'en' } as unknown as Promise<
          (typeof Home)['arguments']
        >,
      }),
    )

    expect(screen.getByText('/')).toBeDefined()
  })
})
