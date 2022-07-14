import * as React from 'react'
import { default as NextLink } from 'next/link'
import MUILink from '@mui/material/Link'

const Link = React.forwardRef((props, ref) => {
  const {
    href,
    as,
    passHref = true,
    prefetch,
    replace,
    scroll,
    shallow,
    locale,
    ...muiLinkProps
  } = props
  return <NextLink {...{
    href,
    as,
    passHref,
    prefetch,
    replace,
    scroll,
    shallow,
    locale,
  }}>
    <MUILink {...muiLinkProps} ref={ref}/>
  </NextLink>
})

Link.displayName = 'Link'

export default Link
