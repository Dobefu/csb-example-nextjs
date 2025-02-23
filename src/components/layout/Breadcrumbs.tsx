import { EntryPreview } from '@/types/entry-preview'
import { cn } from '@/utils/cn'
import LocaleLink from '../utils/LocaleLink'

type Props = {
  breadcrumbs: EntryPreview[]
}

export default function Breadcrumbs({ breadcrumbs }: Readonly<Props>) {
  if (breadcrumbs.length <= 1) {
    return
  }

  return (
    <div className="px-8 pb-8">
      <ol className="flex flex-wrap gap-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            className={cn(
              'after:ps-2 after:font-medium after:text-gray-400',
              index !== breadcrumbs.length - 1 && "after:content-['/']",
            )}
            key={breadcrumb.uid}
          >
            <LocaleLink href={breadcrumb.url}>{breadcrumb.title}</LocaleLink>
          </li>
        ))}
      </ol>
    </div>
  )
}
