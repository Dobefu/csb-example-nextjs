import LocaleLink from '@/components/utils/LocaleLink'

export default function NotFound() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-medium">Not Found</h1>
      <p>Could not find requested resource</p>
      <LocaleLink className="text-blue-600" href="/">
        Return Home
      </LocaleLink>
    </div>
  )
}
