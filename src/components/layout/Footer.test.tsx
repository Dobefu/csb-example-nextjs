import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Footer from './Footer'

vi.mock('next/config', () => ({
  default: () => {
    return {
      publicRuntimeConfig: {
        appName: 'Testing',
      },
    }
  },
}))

describe('Footer', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    cleanup()
  })

  it('Renders', () => {
    render(<Footer />)

    expect(screen.getByRole('contentinfo')).toBeDefined()
  })
})
