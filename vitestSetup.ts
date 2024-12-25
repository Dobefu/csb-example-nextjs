import { loadEnvFile } from 'node:process'
import { vi } from 'vitest'

loadEnvFile('.env.test')

vi.mock('next/config', () => ({
  default: () => {
    return {
      publicRuntimeConfig: {
        appName: 'Testing',
      },
    }
  },
}))

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation')
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
