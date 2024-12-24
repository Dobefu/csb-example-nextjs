import getConfig from 'next/config'
import Link from 'next/link'

export default function Header() {
  const { publicRuntimeConfig } = getConfig()

  return (
    <header className="flex justify-between gap-4 p-4 text-2xl font-medium">
      <nav>
        <Link href="/">{publicRuntimeConfig.appName}</Link>
      </nav>
    </header>
  )
}
