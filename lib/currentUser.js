
import { useEffect } from 'react'
import Router from 'next/router'
import useView from '../lib/useView'

export function useCurrentUser({
  redirectToIfFound,
  redirectToIfNotFound,
} = {}) {

  const { view: currentUser, loading, error, mutate } = useView('session.currentUser')
  console.log('session.currentUser =>', currentUser)

  useEffect(
    () => {
      console.log('🔥', {
        loading,
        currentUser,
        redirectToIfFound,
        redirectToIfNotFound,
      })
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
