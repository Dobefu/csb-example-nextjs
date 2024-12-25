import { logError } from '@/utils/logger'
import { getPageByUrl } from '@/utils/query/get-page-by-url'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ locale: string; slug?: string[] }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slugParts = (await params).slug ?? ['']
  const url = `/${slugParts.join('/')}`
  const locale = (await params).locale

  const { data, error } = await getPageByUrl(url, locale)

  if (error || !data) {
    logError(`Cannot get the page: ${error}`)
    return notFound()
  }

  return {
    title: data.entry.seo?.title || data.entry.title,
  }
}

export default async function Home({ params }: Readonly<Props>) {
  const slugParts = (await params).slug ?? ['']
  const url = `/${slugParts.join('/')}`
  const locale = (await params).locale

  const { data, error } = await getPageByUrl(url, locale)

  if (error) {
    logError(`Cannot get the page: ${error}`)
    return notFound()
  }

  return <code className="whitespace-pre">{JSON.stringify(data, null, 2)}</code>
}
