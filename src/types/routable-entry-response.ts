import { Entry } from './entry'

export interface RoutableEntryResponse {
  data: {
    alt_locales: {
      uid: string
      content_type: string
      locale: string
      slug: string
      url: string
    }[]
    entry: Entry
  } | null
  error: string | null
}
