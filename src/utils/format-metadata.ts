import { AltLocale } from '@/types/alt-locale'
import { Entry } from '@/types/entry'
import { Metadata } from 'next'

export default function formatMetadata(
  entry: Entry,
  altLocales: AltLocale[],
): Metadata {
  const altLocalesMeta: Record<string, string> = {}

  for (const altLocale of altLocales) {
    altLocalesMeta[altLocale.locale] = `/${altLocale.locale}${altLocale.url}`
  }

  return {
    title: entry.seo?.title ?? entry.title,
    description: entry.seo?.description,
    alternates: {
      canonical: '/',
      languages: altLocalesMeta,
    },
    openGraph: {
      title: entry.seo?.og_title ?? entry.title,
      description: entry.seo?.og_description ?? entry.seo?.description,
    },
  }
}
