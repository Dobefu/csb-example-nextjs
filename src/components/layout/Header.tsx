import getConfig from 'next/config'
import LocaleLink from '../utils/LocaleLink'
import LocaleSwitcher from './LocaleSwitcher'

export default function Header() {
  const { publicRuntimeConfig } = getConfig()

  return (
    <header className="flex justify-between gap-4 p-4">
      <nav className="text-2xl font-medium">
        <LocaleLink href="/">{publicRuntimeConfig.appName}</LocaleLink>
      </nav>

      <nav>
        <LocaleSwitcher />
      </nav>
    </header>
  )
}
