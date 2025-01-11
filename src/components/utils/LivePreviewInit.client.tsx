'use client'

import ContentstackLivePreview from '@contentstack/live-preview-utils'
import { useEffect } from 'react'

interface Props {
  apiKey: string
}

export default function LivePreviewInit({ apiKey }: Props) {
  useEffect(() => {
    ContentstackLivePreview.init({
      ssr: true,
      enable: true,
      mode: 'builder',
      stackDetails: {
        apiKey: apiKey,
        environment: 'production',
      },
    })
  }, [])

  return <>{}</>
}
