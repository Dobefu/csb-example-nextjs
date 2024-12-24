import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Header from './Header'

describe('Header', () => {
  afterEach(() => {
    cleanup()
  })

  it('Renders', () => {
    render(<Header />)

    expect(screen.getByRole('banner')).toBeDefined()
  })
})
