'use client'

import { LocaleContext } from '@/app/[locale]/providers'
import NextLink, { LinkProps } from 'next/link'
import React, { useContext } from 'react'

const LocaleLink: React.FC<LinkProps & React.HTMLProps<HTMLAnchorElement>> = (
  props,
) => {
  const locale = useContext(LocaleContext)

  const newProps = {
    ...props,
    href: `/${locale}${props.href}`,
  }

  console.log(newProps)
  return <NextLink {...newProps}>{newProps.children}</NextLink>
}

export default LocaleLink
