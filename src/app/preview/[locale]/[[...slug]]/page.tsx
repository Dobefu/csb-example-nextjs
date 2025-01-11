import LivePreviewInit from '@/components/utils/LivePreviewInit.client'
import { Entry } from '@/types/entry'
import getContentstackStack from '@/utils/get-contentstack-stack'
import { logError } from '@/utils/logger'
import { getPageByUrl } from '@/utils/query/get-page-by-url'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ locale: string; slug?: string[] }>
  searchParams: Promise<Record<string, string>>
}

export default async function Home({ params, searchParams }: Readonly<Props>) {
  const previewToken = (await searchParams)['live_preview'] ?? ''
  let contentTypeUid = (await searchParams)['content_type_uid'] ?? ''
  let entryUid = (await searchParams)['entry_uid'] ?? ''
  const previewTimestamp = (await searchParams)['preview_timestamp'] ?? ''
  const releaseId = (await searchParams)['release_id'] ?? ''

  const locale = (await params).locale
  const stack = getContentstackStack(true)

  let data: { entry: Entry }

  try {
    stack.livePreviewQuery({
      live_preview: previewToken,
      content_type_uid: contentTypeUid,
      preview_timestamp: previewTimestamp,
      release_id: releaseId,
    })

    if (!entryUid) {
      const slugParts = (await params).slug ?? ['']
      const url = `/${slugParts.join('/')}`
      const locale = (await params).locale

      const { data: pageByUrl, error } = await getPageByUrl(url, locale)

      if (!pageByUrl || error) {
        logError(`Cannot get the page: ${error}`)
        return notFound()
      }

      contentTypeUid = pageByUrl.entry.content_type
      entryUid = pageByUrl.entry.uid
    }

    data = {
      entry: await stack
        .ContentType(contentTypeUid)
        .Entry(entryUid)
        .toJSON()
        .fetch(),
    }
  } catch (e) {
    logError(e as string)
    return <LivePreviewInit apiKey={process.env.CS_API_KEY ?? ''} />
  }

  if (!data?.entry) {
    return <LivePreviewInit apiKey={process.env.CS_API_KEY ?? ''} />
  }

  const cslpBase = `${contentTypeUid}.${entryUid}.${locale}`
  const titleField = data.entry.seo?.title ? 'seo.title' : 'title'

  return (
    <>
      <LivePreviewInit apiKey={process.env.CS_API_KEY ?? ''} />

      <h1
        className="text-xl font-medium"
        data-cslp={`${cslpBase}.${titleField}`}
      >
        {data.entry.seo?.title || data.entry.title}
      </h1>
    </>
  )
}
