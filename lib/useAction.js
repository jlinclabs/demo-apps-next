import useAsync from './useAsync'

// import useSWR from 'swr'

// const fetcher = url => fetch(url).then(r => r.json())

export default function useAction(actionId){
  console.log('useAction', { actionId })
  // const { data: view, mutate } = useSWR(`/api/actions/${actionId}`, fetcher)
  // return { view, mutate }
  return useAsync(
    (options = {}) => (
      console.log('CALL???', options) ||
      fetch(`/api/actions/${actionId}`, {
        method: 'POST',
        body: JSON.stringify(options),
      })
    ),
    false,
  )
}
