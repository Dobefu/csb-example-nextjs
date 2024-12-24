import getConfig from 'next/config'

export default function Footer() {
  const { publicRuntimeConfig } = getConfig()

  return <footer>{publicRuntimeConfig.appName}</footer>
}
