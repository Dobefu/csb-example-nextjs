import { AltLocale } from '@/types/alt-locale'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Header from './Header'

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

describe('Header', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    cleanup()
  })

  it('Renders', () => {
    render(<Header altLocales={mockAltLocales} />)

    expect(screen.getByRole('banner')).toBeDefined()
  })
})
