import { AltLocale } from '@/types/alt-locale'
import getConfig from 'next/config'
import LocaleLink from '../utils/LocaleLink'
import LocaleSwitcher from './LocaleSwitcher'

type Props = {
  altLocales: AltLocale[]
}

export default function Header({ altLocales }: Readonly<Props>) {
  const { publicRuntimeConfig } = getConfig()

  return (
    <header className="flex flex-wrap justify-between gap-4 p-8">
      <nav className="text-2xl font-medium">
        <LocaleLink href="/">{publicRuntimeConfig.appName}</LocaleLink>
      </nav>

      <nav>
        <LocaleSwitcher altLocales={altLocales} />
      </nav>
    </header>
  )
}
