import { cleanup, render, screen } from '@testing-library/react'
import { beforeEach } from 'node:test'
import { loadEnvFile } from 'process'
import { afterEach, describe, expect, it } from 'vitest'
import Home from './page'

describe('Home', () => {
  beforeEach(() => {
    loadEnvFile('.env.test')
  })

  afterEach(() => {
    cleanup()
    loadEnvFile('.env.test')
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
            searchParams: {},
          })
        }),
      ),
    )

    expect(screen).toBeDefined()
  })

  it('Renders normally on a nested route', async () => {
    render(
      await Home(
        await new Promise<(typeof Home)['arguments']>((resolve) => {
          resolve({
            params: {
              locale: 'en',
              slug: [
                'nesting-level-0',
                'nesting-level-1-1',
                'nesting-level-2-1',
              ],
            },
            searchParams: {},
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
            searchParams: {},
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
          resolve({ params: { locale: 'en' }, searchParams: {} })
        }),
      ),
    )

    expect(screen).toBeDefined()
  })
})
