import * as React from 'react'

import useAction from '../lib/useAction'

export default function ActionForm({
  children,
  action,
  options = {},
  ...props
}){

  const onSubmit = event => {
    event.preventDefault()
    const form = event.target.closest('form')
    console.log('TAKE ACTION', {
      action,
      options,
      form,
    })
  }

  return <form {...{...props, onSubmit}}>
    {children}
  </form>
}
