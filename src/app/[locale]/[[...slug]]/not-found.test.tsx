import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import NotFound from './not-found'

describe('Home', () => {
  afterEach(() => {
    cleanup()
  })

  it('Renders normally', () => {
    render(NotFound())

    expect(screen).toBeDefined()
  })
})
