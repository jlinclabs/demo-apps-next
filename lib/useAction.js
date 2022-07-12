import { useState, useCallback } from 'react'

export default function useAction(actionId){
  const [value, setValue] = useState(null)
  const call = useCallback(
    options => {
      if (call.pending){
        console.trace(`already executing`, call)
        throw new Error(`already executing`)
      }
      const promise = takeAction(actionId, options).then(
        result => {
          setValue(result)
        },
        error => {
          setValue(error)
        },
      )
      setValue(promise)
      return promise
    },
    [actionId]
  )

  call.value = value
  call.pending = value instanceof Promise
  call.failed = value instanceof Error
  call.success = !call.pending && !call.failed && !!value
  return call
}

async function takeAction(actionId, options){
  const response = await fetch(
    `/api/actions/${actionId}`,
    {
      method: 'POST',
      body: JSON.stringify(options),
    }
  )
  const data = response.json()
  if (data.error){
    throw new Error(data.error.message)
  }
  return data
}
