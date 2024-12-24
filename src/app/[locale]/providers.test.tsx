import LocaleLink from '@/components/utils/LocaleLink'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Providers from './providers'

describe('providers', () => {
  afterEach(() => {
    cleanup()
  })

  it('Renders', () => {
    render(
      <Providers locale="en">
        <LocaleLink href="/">Test</LocaleLink>
      </Providers>,
    )

    expect(screen.getByRole('link')).toBeDefined()
    expect(screen.getByRole('link').getAttribute('href')).toBe('/en')
  })
})
