'use client'

import ContentstackLivePreview from '@contentstack/live-preview-utils'
import { useEffect } from 'react'

export default function LivePreviewInit() {
  useEffect(() => {
    ContentstackLivePreview.init({})
  }, [])

  return <>{}</>
}
