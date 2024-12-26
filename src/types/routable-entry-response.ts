import { AltLocale } from './alt-locale'
import type { Entry } from './entry'
import { EntryPreview } from './entry-preview'

export interface RoutableEntryResponse {
  data: {
    alt_locales: AltLocale[]
    breadcrumbs: EntryPreview[]
    entry: Entry
  } | null
  error: string | null
}
