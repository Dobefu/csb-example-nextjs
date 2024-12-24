import { cleanup } from '@testing-library/react'
import { NextURL } from 'next/dist/server/web/next-url'
import { NextRequest, NextResponse } from 'next/server'
import { afterEach, describe, expect, it, vitest } from 'vitest'
import { middleware } from './middleware'

describe('middleware', () => {
  const redirectSpy = vitest.spyOn(NextResponse, 'redirect')

  afterEach(() => {
    cleanup()
    redirectSpy.mockReset()
    process.env.LOCALES =
      '[{"code":"en","name":"English"},{"code":"nl","name":"Dutch"}]'
  })

  it("doesn't redirect for valid locales", () => {
    middleware(new NextRequest(new URL('http://localhost:3000/en')))
    expect(redirectSpy).not.toHaveBeenCalled()

    middleware(new NextRequest(new URL('http://localhost:3000/en/homepage')))
    expect(redirectSpy).not.toHaveBeenCalled()
  })

  it('redirects for invalid locales', () => {
    middleware(new NextRequest(new URL('http://localhost:3000/invalid/')))
    expect(redirectSpy).toHaveBeenCalledWith(
      new NextURL('http://localhost:3000/en/invalid/', {
        headers: {},
      }),
    )
  })
})
