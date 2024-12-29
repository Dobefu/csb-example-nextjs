import { AltLocale } from '@/types/alt-locale'
import getConfig from 'next/config'
import LocaleLink from '../utils/LocaleLink'
import LocaleSwitcher from './LocaleSwitcher.client'

type Props = {
  altLocales: AltLocale[]
}

export default function Header({ altLocales }: Readonly<Props>) {
  const { publicRuntimeConfig } = getConfig()

  return (
    <header className="flex flex-wrap justify-between gap-4 p-8">
      <div className="text-2xl font-medium">
        <LocaleLink className="align-middle leading-none" href="/">
          {publicRuntimeConfig.appName}
        </LocaleLink>
      </div>

      <div>
        <LocaleSwitcher altLocales={altLocales} />
      </div>
    </header>
  )
}
