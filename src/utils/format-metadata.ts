import { AltLocale } from '@/types/alt-locale'
import { Entry } from '@/types/entry'
import { Metadata } from 'next'

export default function formatMetadata(
  entry: Entry,
  altLocales: AltLocale[],
): Metadata {
  const altLocalesMeta: Record<string, string> = {}
  const host = process.env.APP_HOST ?? ''

  for (const altLocale of altLocales) {
    altLocalesMeta[altLocale.locale] =
      `${host}/${altLocale.locale}${altLocale.url}`
  }

  return {
    title: entry.seo?.title ?? entry.title,
    description: entry.seo?.description,
    alternates: {
      canonical: `${host}${entry.url}`,
      languages: altLocalesMeta,
    },
    openGraph: {
      title: entry.seo?.og_title ?? entry.title,
      description: entry.seo?.og_description ?? entry.seo?.description,
    },
  }
}
