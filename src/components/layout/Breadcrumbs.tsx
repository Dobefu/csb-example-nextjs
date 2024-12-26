import { EntryPreview } from '@/types/entry-preview'
import LocaleLink from '../utils/LocaleLink'

type Props = {
  breadcrumbs: EntryPreview[]
}

export default function Breadcrumbs({ breadcrumbs }: Readonly<Props>) {
  return (
    <div className="px-8">
      <ol className="after:[/] flex gap-4">
        {breadcrumbs.map((breadcrumb) => (
          <li key={breadcrumb.uid}>
            <LocaleLink href={breadcrumb.url}>{breadcrumb.title}</LocaleLink>
          </li>
        ))}
      </ol>
    </div>
  )
}
