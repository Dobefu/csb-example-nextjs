import getConfig from 'next/config'

export default function Header() {
  const { publicRuntimeConfig } = getConfig()

  return <header>{publicRuntimeConfig.appName}</header>
}
