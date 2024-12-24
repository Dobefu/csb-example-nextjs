import { vi } from 'vitest'

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
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
  }
})
