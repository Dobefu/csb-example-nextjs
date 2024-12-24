import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import LocaleSwitcher from './LocaleSwitcher'

describe('LocaleSwitcher', () => {
  afterEach(() => {
    cleanup()
    process.env.MOCK_PATHNAME = '/'
    process.env.LOCALES = 'en,nl'
  })

  it('Renders normally', async () => {
    render(<LocaleSwitcher />)

    expect(screen.getByRole<HTMLSelectElement>('combobox').value).toBe('en')
    expect(screen.getAllByRole('option').length).toBe(2)
  })

  it('Redirects the root path', async () => {
    process.env.MOCK_PATHNAME = '/'

    render(<LocaleSwitcher />)

    fireEvent.change(screen.getByRole<HTMLSelectElement>('combobox'))
  })

  it('Redirects with a query parameter', async () => {
    process.env.MOCK_PATHNAME = '/?test=1'

    render(<LocaleSwitcher />)

    fireEvent.change(screen.getByRole<HTMLSelectElement>('combobox'))
  })

  it('Falls back on English without any locales', async () => {
    process.env.LOCALES = ''

    render(<LocaleSwitcher />)

    expect(screen.getByRole<HTMLSelectElement>('combobox').value).toBe('en')
    expect(screen.getAllByRole('option').length).toBe(1)
  })
})
