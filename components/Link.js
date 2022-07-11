import * as React from 'react'
import { default as RouterLink } from 'next/link'
import MUILink from '@mui/material/Link'

const Link = React.forwardRef(({...props}, ref) => {
  props.ref = ref
  props.component = RouterLink
  // if (props.to)
  // if (props.href) props.target = '_blank'
  return <MUILink {...props}/>
})

export default Link
