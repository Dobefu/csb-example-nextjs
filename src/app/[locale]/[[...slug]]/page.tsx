import { logError } from '@/utils/logger'
import { getPageByUrl } from '@/utils/query/get-page-by-url'
import { notFound } from 'next/navigation'

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ locale: string; slug?: string[] }>
}>) {
  const slugParts = (await params).slug ?? ['']
  const url = `/${slugParts.join('/')}`
  const locale = (await params).locale ?? 'en'

  const { data, error } = await getPageByUrl(url, locale)

  if (error) {
    logError(`Cannot get the page: ${error}`)
    return notFound()
  }

  return <code className="whitespace-pre">{JSON.stringify(data, null, 2)}</code>
}
