import { logError } from '@/utils/logger'
import { getPageByUrl } from '@/utils/query/get-page-by-url'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ locale: string; slug?: string[] }> }

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
