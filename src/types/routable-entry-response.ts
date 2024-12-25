import { AltLocale } from './alt-locale'
import type { Entry } from './entry'

export interface RoutableEntryResponse {
  data: {
    alt_locales: AltLocale[]
    entry: Entry
  } | null
  error: string | null
}
