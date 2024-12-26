import { AltLocale } from '@/types/alt-locale'
import { Entry } from '@/types/entry'
import { beforeEach, describe, expect, it } from 'vitest'
import formatMetadata from './format-metadata'

let mockEntry: Entry
let mockAltLocales: AltLocale[] = []

describe('format-metadata', () => {
  beforeEach(() => {
    mockEntry = {
      ACL: {},
      _in_progress: false,
      _version: 1,
      created_at: '',
      created_by: '',
      locale: 'en',
      parent: [],
      publish_details: {
        environment: 'main',
        locale: 'en',
        time: '',
        user: '',
      },
      tags: [],
      title: 'Test Title',
      uid: '',
      updated_at: '',
      updated_by: '',
      url: '/',
      seo: undefined,
    } satisfies Entry

    mockAltLocales = [
      {
        uid: '',
        content_type: '',
        locale: 'nl',
        slug: '/',
        url: '/',
      } satisfies AltLocale,
    ]
  })

  it('formats the metadata correctly', () => {
    const metadata = formatMetadata(mockEntry, mockAltLocales)

    expect(metadata).toMatchObject({
      alternates: {
        canonical: undefined,
        languages: {
          nl: `${process.env.APP_HOST}/nl/`,
        },
      },
      description: undefined,
      openGraph: {
        description: undefined,
        title: 'Test Title',
      },
      title: 'Test Title',
    })
  })

  it('formats the metadata correctly with SEO data', () => {
    mockEntry['url'] = '/test-page-1'
    mockEntry['seo'] = {
      description: 'Test Description',
      og_description: 'Test OG Description',
      og_title: 'Test OG Title',
      title: 'Test SEO Title',
    }

    const metadata = formatMetadata(mockEntry, mockAltLocales)

    expect(metadata).toMatchObject({
      alternates: {
        canonical: `${process.env.APP_HOST}/test-page-1`,
        languages: {
          nl: `${process.env.APP_HOST}/nl/`,
        },
      },
      description: 'Test Description',
      openGraph: {
        description: 'Test OG Description',
        title: 'Test OG Title',
      },
      title: 'Test SEO Title',
    })
  })

  it('formats the metadata correctly with partial SEO data', () => {
    mockEntry['url'] = '/test-page-1'
    mockEntry['seo'] = {
      description: 'Test Description',
      og_title: 'Test OG Title',
    }

    const metadata = formatMetadata(mockEntry, mockAltLocales)

    expect(metadata).toMatchObject({
      alternates: {
        canonical: `${process.env.APP_HOST}/test-page-1`,
        languages: {
          nl: `${process.env.APP_HOST}/nl/`,
        },
      },
      description: 'Test Description',
      openGraph: {
        description: 'Test Description',
        title: 'Test OG Title',
      },
      title: 'Test Title',
    })
  })

  it('formats the metadata correctly with a missing APP_HOST variable', () => {
    delete process.env.APP_HOST

    const metadata = formatMetadata(mockEntry, mockAltLocales)

    expect(metadata).toMatchObject({
      alternates: {
        canonical: undefined,
        languages: {
          nl: '/nl/',
        },
      },
      description: undefined,
      openGraph: {
        description: undefined,
        title: 'Test Title',
      },
      title: 'Test Title',
    })
  })
})
