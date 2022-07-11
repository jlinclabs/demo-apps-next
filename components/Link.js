import * as React from 'react'
import { default as NextLink } from 'next/link'
import MUILink from '@mui/material/Link'

const Link = React.forwardRef(({href, ...props}, ref) => {
  props.ref = ref
  return <NextLink href={href}>
    <MUILink {...props}/>
  </NextLink>
})

export default Link
