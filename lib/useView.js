import { useState, useEffect } from 'react'

// import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

export default function useView(viewId){
  console.log('useView', { viewId })
  const [value, setValue] = useState() // TODO use SWR caching here
  const [error, setError] = useState()
  const loading = value instanceof Promise
  // const error = value instanceof Error ? value : undefined

  useEffect(
    () => {
      const eventSource = new EventSource(`/api/views/${viewId}`)
      console.log({ eventSource })
      eventSource.onerror = (error) => {
        setError(error)
      }
      eventSource.onmessage = (event) => {
        const value = JSON.parse(event.data)
        setValue(value)
      }
      return () => {
        eventSource.close()
      }
    },
    [viewId]
  )

  return [value, { loading, error }]
}





// async function subscribeToView(viewId){
//   const response = await fetch(
//     `/api/views/${viewId}`,
//     {
//       method: 'GET',
//       body: JSON.stringify(options),
//       headers: {
//         Accepts: 'text/event-stream',
//       }
//     }
//   )
//   const result = await response.json()
//   console.log('RESULT', { actionId, options, result })
//   if (result.error){
//     const error = new Error(result.error.message)
//     if (result.error.stack) {
//       error.stack = result.error.stack + '\n' + error.stack
//     }
//     throw error
//   }
//   return result
// }



// import * as React from 'react'
// import { useRef, useState, useCallback, useEffect } from 'react'
// import useAsync from './useAsync'

// // get the current value of and subscribe to new changes
// export default function useResource(resourceName){
//   const url = `/api/resources/${resourceName}`

//   const eventsRef = useRef()
//   const [value, setValue] = useState()

//   useEffect(
//     () => {
//       const events = new EventSource(url)
//       console.log({ url, events })
//       events.onmessage = (event) => {
//         const value = JSON.parse(event.data)
//         setValue(value)
//       }
//       eventsRef.current = events
//       return () => {
//         eventsRef.current = undefined
//         events.close()
//       }
//     },
//     [resourceName]
//   )

//   return value
// }


