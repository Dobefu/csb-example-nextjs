import { afterAll, describe, expect, it, vi } from 'vitest'
import { logError, logWarning } from './logger'

vi.mock('')

describe('logger', () => {
  const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const consoleErrorMock = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {})

  afterAll(() => {
    consoleErrorMock.mockReset()
  })

  it('renders warning', () => {
    logWarning('Test')

    expect(consoleWarnMock).toHaveBeenCalledOnce()
  })

  it('renders errors', () => {
    logError('Test')

    expect(consoleErrorMock).toHaveBeenCalledOnce()
  })
})
