import formatMetadata from '@/utils/format-metadata'
import { logError } from '@/utils/logger'
import { getPageByUrl } from '@/utils/query/get-page-by-url'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ locale: string; slug?: string[] }> }

export async function generateMetadata({
  params,
}: Readonly<Props>): Promise<Metadata | undefined> {
  const slugParts = (await params).slug ?? ['']
  const url = `/${slugParts.join('/')}`
  const locale = (await params).locale

  const { data, error } = await getPageByUrl(url, locale)

  if (error || !data) {
    logError(`Cannot get the page: ${error}`)
    return
  }

  return formatMetadata(data.entry, data.alt_locales)
}

export default async function Home({ params }: Readonly<Props>) {
  const slugParts = (await params).slug ?? ['']
  const url = `/${slugParts.join('/')}`
  const locale = (await params).locale

  const { data, error } = await getPageByUrl(url, locale)

  if (!data || error) {
    logError(`Cannot get the page: ${error}`)
    return notFound()
  }

  const cslpBase = `${data.entry.content_type}.${data.entry.uid}.${locale}`

  return (
    <h1 className="text-xl font-medium" data-cslp={`${cslpBase}.title`}>
      {data.entry.seo?.title ?? data.entry.title}
    </h1>
  )
}
