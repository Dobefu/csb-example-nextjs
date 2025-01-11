import { afterEach, beforeEach } from 'node:test'
import { loadEnvFile } from 'process'
import { describe, expect, it } from 'vitest'
import getContentstackStack from './get-contentstack-stack'

describe('get-contentstack-stack', () => {
  beforeEach(() => {
    loadEnvFile('.env.test')
  })

  afterEach(() => {
    loadEnvFile('.env.test')
  })

  it('returns a stack without live preview', () => {
    const stack = getContentstackStack(false)

    expect(stack.live_preview).toBe(undefined)
  })

  it('returns a stack with live preview', () => {
    const stack = getContentstackStack(true)

    expect(stack.live_preview.enable).toBe(true)
  })

  it('returns a stack with empty string fallbacks', () => {
    delete process.env.CS_API_KEY
    delete process.env.CS_DELIVERY_TOKEN
    delete process.env.CS_PREVIEW_TOKEN

    const stack = getContentstackStack(true)

    expect(stack.live_preview.enable).toBe(true)
  })
})
