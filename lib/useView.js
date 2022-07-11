
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

export default function useView(viewName){
  console.log('useView', { viewName })
  const { data: view, mutate } = useSWR(`/api/views/${viewName}`, fetcher)
  return { view, mutate }
}
