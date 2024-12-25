import type { Entry } from '@/types/entry'
import getConfig from 'next/config'

export default function formatPageTitle(entry: Entry): string {
  const title = entry.title

  const { publicRuntimeConfig } = getConfig()
  return `${title} | ${publicRuntimeConfig.appName}`
}
