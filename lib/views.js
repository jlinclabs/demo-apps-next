import { useCallback } from 'react'
import useSWR, { useSWRConfig } from 'swr'

const viewIdToSwrKey = viewId => `/api/views/${viewId}`
export function useView(viewId){
  const swrKey = viewIdToSwrKey(viewId)
  const { data: view, error, mutate } = useSWR(swrKey, fetchView)
  const loading = typeof view === 'undefined'
  console.log('useView render', { viewId, view, error, loading })
  const reload = useCallback(() => { mutate(swrKey) }, [swrKey, mutate])
  return { view, loading, error, mutate, reload }
}

export function useReloadView(viewId){
  const swrKey = viewIdToSwrKey(viewId)
  const { mutate } = useSWRConfig()
  return useCallback(() => { mutate(swrKey) }, [swrKey, mutate])
}


async function fetchView(url){
  const res = await fetch(url)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  const data = await res.json()

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = data
    error.status = res.status
    throw error
  }

  return data.value
}
