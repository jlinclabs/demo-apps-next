import useSWR from 'swr'

export default function useView(viewId){
  const { data: view, error, mutate } = useSWR(`/api/views/${viewId}`, fetchView)
  const loading = typeof view === 'undefined'
  console.log('useView render', { viewId, view, error, loading })
  return { view, loading, error, mutate }
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
