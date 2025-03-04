import getConfig from 'next/config'

export default function Footer() {
  const { publicRuntimeConfig } = getConfig()

  return (
    <footer className="p-8 text-center text-gray-600">
      {publicRuntimeConfig.appName}
    </footer>
  )
}
