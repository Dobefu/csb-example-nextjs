import { afterAll, describe, expect, it, vi } from 'vitest'
import { logError } from './logger'

vi.mock('')

describe('logger', () => {
  const consoleErrorMock = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {})

  afterAll(() => {
    consoleErrorMock.mockReset()
  })

  it('renders', () => {
    logError('Test')

    expect(consoleErrorMock).toHaveBeenCalledOnce()
  })
})
