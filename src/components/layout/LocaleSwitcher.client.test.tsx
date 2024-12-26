import { AltLocale } from '@/types/alt-locale'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { loadEnvFile } from 'node:process'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import LocaleSwitcher from './LocaleSwitcher.client'

vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...(actual as object),
    useContext: () => 'nl',
  }
})

const mockAltLocales: AltLocale[] = [
  {
    uid: '',
    content_type: '',
    locale: 'en',
    slug: '/',
    url: '/',
  },
]

describe('LocaleSwitcher', () => {
  beforeEach(() => {
    loadEnvFile('.env.test')
  })

  afterEach(() => {
    cleanup()
    loadEnvFile('.env.test')
  })

  it('Renders normally', async () => {
    process.env.MOCK_PATHNAME = '/'

    render(<LocaleSwitcher altLocales={mockAltLocales} />)

    expect(screen.getByRole<HTMLSelectElement>('combobox').value).toBe('nl')
    expect(screen.getAllByRole('option').length).toBe(2)
  })

  it('Renders with the current locale as the only option', async () => {
    process.env.MOCK_PATHNAME = '/'

    const altLocales = [
      {
        uid: '',
        content_type: '',
        locale: 'nl',
        slug: '/',
        url: '/',
      },
    ]

    render(<LocaleSwitcher altLocales={altLocales} />)

    expect(screen.getByRole<HTMLSelectElement>('combobox').value).toBe('nl')
    expect(screen.getAllByRole('option').length).toBe(1)
  })

  it('Redirects the root path', async () => {
    process.env.MOCK_PATHNAME = '/'

    render(<LocaleSwitcher altLocales={mockAltLocales} />)

    fireEvent.change(screen.getByRole<HTMLSelectElement>('combobox'))
    expect(screen.getAllByRole('option').length).toBe(2)
  })

  it('Redirects with a query parameter', async () => {
    process.env.MOCK_PATHNAME = '/?test=1'

    render(<LocaleSwitcher altLocales={mockAltLocales} />)

    fireEvent.change(screen.getByRole<HTMLSelectElement>('combobox'))
    expect(screen.getAllByRole('option').length).toBe(2)
  })
})
