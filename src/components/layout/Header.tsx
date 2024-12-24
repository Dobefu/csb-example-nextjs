import getConfig from 'next/config'
import LocaleLink from '../utils/LocaleLink'

export default function Header() {
  const { publicRuntimeConfig } = getConfig()

  return (
    <header className="flex justify-between gap-4 p-4 text-2xl font-medium">
      <nav>
        <LocaleLink href="/">{publicRuntimeConfig.appName}</LocaleLink>
      </nav>
    </header>
  )
}
