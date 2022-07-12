
import { useEffect } from 'react'
import Router from 'next/router'
import useAction from './useAction'
import { useView, useReloadView } from './views'

export function useCurrentUser({
  redirectToIfFound,
  redirectToIfNotFound,
} = {}) {

  const { view: currentUser, loading, error, mutate } = useView('session.currentUser')
  console.log('session.currentUser =>', currentUser)

  useEffect(
    () => {
      if (loading) return
      if (redirectToIfFound && currentUser){
        Router.push(redirectToIfFound)
      }else if (redirectToIfNotFound && !currentUser){
        Router.push(redirectToIfNotFound)
      }
    },
    [
      loading,
      currentUser,
      redirectToIfFound,
      redirectToIfNotFound
    ]
  )
  const reload = () => { mutate() }
  return { currentUser, loading, error, mutate, reload }
}

export function useReloadCurrentUser(){
  return useReloadView('session.currentUser')
}


export function useLogin(){
  const reloadCurrentUser = useReloadCurrentUser()
  return useAction('session.login', {
    onSuccess(){
      reloadCurrentUser()
    },
  })
}

export function useLogout(){
  const reloadCurrentUser = useReloadCurrentUser()
  return useAction('session.logout', {
    onSuccess(){
      reloadCurrentUser()
    },
  })
}
