
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAction } from './actions'
import { useView, useReloadView } from './views'

export function useCurrentUser({
  redirectToIfFound,
  redirectToIfNotFound,
} = {}) {
  const router = useRouter()
  const { view: currentUser, loading, error, mutate } = useView('session.currentUser')

  useEffect(
    () => {
      if (loading) return
      if (redirectToIfFound && currentUser){
        router.push(redirectToIfFound)
      }else if (redirectToIfNotFound && !currentUser){
        router.push(redirectToIfNotFound)
      }
    },
    [
      router,
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

function useActionAndReloadCurrentUser(action, callbacks = {}){
  const reloadCurrentUser = useReloadCurrentUser()
  return useAction(action, {
    ...callbacks,
    onSuccess(result){
      reloadCurrentUser()
      if (callbacks.onSuccess) callbacks.onSuccess(result)
    },
  })
}
export const useLogin = callbacks =>
  useActionAndReloadCurrentUser('session.login', callbacks)

export const useLogout = callbacks =>
  useActionAndReloadCurrentUser('session.logout', callbacks)

export const useSignup = callbacks =>
  useActionAndReloadCurrentUser('session.signup', callbacks)
