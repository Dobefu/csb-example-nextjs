import getConfig from 'next/config'

export default function Footer() {
  const { publicRuntimeConfig } = getConfig()

  return <header>{publicRuntimeConfig.appName}</header>
}
