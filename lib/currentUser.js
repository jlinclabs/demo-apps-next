
import { useEffect } from 'react'
import Router from 'next/router'
// import useSWR from 'swr'
import useView from '../lib/useView'

export function useCurrentUser({
  redirectToIfFound,
  redirectToIfNotFound,
} = {}) {

  const [currentUser, { loading, error }] = useView('session.currentUser')
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
  return { currentUser, loading, error }
}
