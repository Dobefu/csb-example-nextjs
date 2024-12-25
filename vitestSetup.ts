import { vi } from 'vitest'

process.env.APP_HOST = 'http://localhost:3000'
process.env.LOCALES =
  '[{"code":"en","name":"English"},{"code":"nl","name":"Dutch"}]'

vi.mock('next/config', () => ({
  default: () => {
    return {
      publicRuntimeConfig: {
        appName: 'Testing',
      },
    }
  },
}))

vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation')
  return {
    ...(actual as object),
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
    notFound: vi.fn(),
    useSearchParams: () => {
      return new URLSearchParams(process.env.MOCK_PATHNAME)
    },
    usePathname: () => {
      return process.env.MOCK_PATHNAME
    },
  }
})
