import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

export function useCurrentUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const { data: currentUser, mutate: mutateCurrentUser } = useSWR('/api/currentUser')

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if currentUser data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !currentUser) return

    if (
      // If redirectTo is set, redirect if the currentUser was not found.
      (redirectTo && !redirectIfFound && !currentUser?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the currentUser was found
      (redirectIfFound && currentUser?.isLoggedIn)
    ) {
      Router.push(redirectTo)
    }
  }, [currentUser, redirectIfFound, redirectTo])

  return { currentUser, mutateCurrentUser }
}
