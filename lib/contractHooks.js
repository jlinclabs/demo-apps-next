import { useAction } from './actions'
import { useView } from './views'

export function useOfferContract(callbacks){
  return useAction('contracts.offer', callbacks)
}

export function useContract(id){
  const { view: contract, ...state } = useView(`contracts.${id}`)
  return [contract, state]
}

export function useMyContracts(){
  const { view: myContracts, ...state } = useView(`contracts.mine`)
  return [myContracts, state]
}

export function useSignContract(callbacks){
  return useAction('contracts.sign', callbacks)
}
