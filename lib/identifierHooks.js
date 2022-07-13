import { useAction } from './actions'
import { useView } from './views'

export function useCreateIdentifier(callbacks){
  return useAction('identifiers.create', callbacks)
}

export function useIdentifier(did){
  const { view: identifier, ...state } = useView(`identifiers.${did}`)
  return [identifier, state]
}

export function useMyIdentifiers(){
  const { view: myIdentifiers, ...state } = useView(`identifiers.mine`)
  return [myIdentifiers, state]
}
