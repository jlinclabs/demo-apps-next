import * as React from 'react'
import { useRef, useState, useCallback, useEffect } from 'react'
import useAsync from './useAsync'

// get the current value of and subscribe to new changes
export default function useResource(resourceName){
  const url = `/api/resources/${resourceName}`

  const eventsRef = useRef()
  const [value, setValue] = useState()

  useEffect(
    () => {
      const events = new EventSource(url)
      console.log({ url, events })
      events.onmessage = (event) => {
        const value = JSON.parse(event.data)
        setValue(value)
      }
      eventsRef.current = events
      return () => {
        eventsRef.current = undefined
        events.close()
      }
    },
    [resourceName]
  )

  return value
}


