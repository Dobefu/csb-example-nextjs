import { logError } from '@/utils/logger'
import { getPageByUrl } from '@/utils/query/get-page-by-url'
import { notFound } from 'next/navigation'

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ locale: string; slug?: string[] }>
}>) {
  const { data, error } = await getPageByUrl('/', 'en')

  if (error) {
    logError(`Cannot get the page: ${error}`)
    return notFound()
  }

  return <code className="whitespace-pre">{JSON.stringify(data, null, 2)}</code>
}
