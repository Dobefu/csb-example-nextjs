export interface RoutableEntryResponse {
  data: {
    alt_locales: {
      uid: string
      content_type: string
      locale: string
      slug: string
      url: string
    }[]
    entry: {
      ACL: unknown
      _in_progress: boolean
      _version: number
      created_at: string
      created_by: string
      locale: string
      parent: {
        _content_type_uid: string
        uid: string
      }[]
      publish_details: {
        environment: string
        locale: string
        time: string
        user: string
      }
      tags: string[]
      title: string
      uid: string
      updated_at: string
      updated_by: string
      url: string
      [key: string]: unknown
    }
  }
  error?: string
}
