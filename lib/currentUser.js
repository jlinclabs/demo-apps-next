
import { useEffect } from 'react'
import Router from 'next/router'
// import useSWR from 'swr'
import useView from '../lib/useView'

export function useCurrentUser({
  redirectToIfFound,
  redirectToIfNotFound,
} = {}) {
  // const { data: currentUser, mutate: mutateCurrentUser } = useSWR('/api/currentUser')

  const { view: currentUser } = useView('session.currentUser')

  useEffect(
    () => {
      if (redirectToIfFound && currentUser){
        Router.push(redirectToIfFound)
      }else if (redirectToIfNotFound && !currentUser){
        Router.push(redirectToIfNotFound)
      }
    },
    [
      currentUser,
      redirectToIfFound,
      redirectToIfNotFound
    ]
  )
  return { currentUser }
}
