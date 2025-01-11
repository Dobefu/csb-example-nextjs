import LivePreviewInit from '@/components/utils/LivePreviewInit.client'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

describe('LivePreviewInit', () => {
  afterEach(() => {
    cleanup()
  })

  it('Renders', () => {
    render(<LivePreviewInit apiKey="bogus" environment="bogus" />)

    expect(screen).toBeDefined()
  })
})
