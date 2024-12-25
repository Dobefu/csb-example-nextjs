import type { Entry } from '@/types/entry'
import getConfig from 'next/config'

export default function formatPageTitle(entry: Entry): string {
  const { publicRuntimeConfig } = getConfig()

  const title: string = entry.seo?.title || entry.title

  return `${title} | ${publicRuntimeConfig.appName}`
}
