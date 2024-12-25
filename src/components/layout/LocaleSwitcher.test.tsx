import { AltLocale } from '@/types/alt-locale'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { loadEnvFile } from 'node:process'
import { afterEach, describe, expect, it } from 'vitest'
import LocaleSwitcher from './LocaleSwitcher'

const mockAltLocales: AltLocale[] = [
  {
    uid: '',
    content_type: '',
    locale: 'en',
    slug: '/',
    url: '/',
  },
  {
    uid: '',
    content_type: '',
    locale: 'nl',
    slug: '/',
    url: '/',
  },
]

describe('LocaleSwitcher', () => {
  afterEach(() => {
    cleanup()
    loadEnvFile('.env.test')
  })

  it('Renders normally', async () => {
    render(<LocaleSwitcher altLocales={mockAltLocales} />)

    expect(screen.getByRole<HTMLSelectElement>('combobox').value).toBe('en')
    expect(screen.getAllByRole('option').length).toBe(2)
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
