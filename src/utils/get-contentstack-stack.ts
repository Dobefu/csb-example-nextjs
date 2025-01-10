import Contentstack, { type LivePreview, type Stack } from 'contentstack'

export default function getContentstackStack(withLivePreview: boolean): Stack {
  return Contentstack.Stack({
    api_key: process.env.CS_API_KEY ?? '',
    delivery_token: process.env.CS_DELIVERY_TOKEN ?? '',
    environment: 'production',
    region: Contentstack.Region.EU,
    live_preview: withLivePreview
      ? ({
          enable: true,
          preview_token: process.env.CS_PREVIEW_TOKEN ?? '',
        } satisfies LivePreview)
      : undefined,
  })
}
