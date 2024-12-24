import NextLink, { LinkProps } from 'next/link'
import React from 'react'

const LocaleLink: React.FC<LinkProps & React.HTMLProps<HTMLAnchorElement>> = (
  props,
) => {
  return <NextLink {...props}>{props.children}</NextLink>
}

export default LocaleLink
