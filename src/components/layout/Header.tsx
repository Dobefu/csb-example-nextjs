import getConfig from 'next/config'

export default function Header() {
  const { publicRuntimeConfig } = getConfig()

  return <header className="p-4">{publicRuntimeConfig.appName}</header>
}
