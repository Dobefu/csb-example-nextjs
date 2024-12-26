import { EntryPreview } from '@/types/entry-preview'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import Breadcrumbs from './Breadcrumbs'

let mockBreadcrumbs: EntryPreview[]

describe('Breadcrumbs', () => {
  beforeEach(() => {
    mockBreadcrumbs = [
      {
        id: '',
        uid: 'breadcrumb_1',
        title: 'Breadcrumb 1',
        content_type: '',
        locale: 'en',
        slug: '',
        url: '/bc1',
        parent: '',
        exclude_sitemap: false,
        published: true,
      },
      {
        id: '',
        uid: 'breadcrumb_2',
        title: 'Breadcrumb 2',
        content_type: '',
        locale: 'en',
        slug: '',
        url: '/bc1/bc2',
        parent: '',
        exclude_sitemap: false,
        published: true,
      },
    ]
  })

  afterEach(() => {
    cleanup()
  })

  it('Renders', () => {
    render(<Breadcrumbs breadcrumbs={mockBreadcrumbs} />)

    expect(screen.getByRole('list')).toBeDefined()
    expect(screen.getAllByRole('listitem').length).toBe(2)
  })

  it('Does not render without any breadcrumbs', async () => {
    mockBreadcrumbs = []

    render(<Breadcrumbs breadcrumbs={mockBreadcrumbs} />)

    await expect(
      async () => await screen.findByRole('list'),
    ).rejects.toThrowError()
  })
})
