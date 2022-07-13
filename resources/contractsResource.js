import db from '../lib/prisma'
import jlinx from '../lib/jlinx'

const contracts = {
  queries: {

    async byId({ id }){
      const contract = await db.contract.findUnique({
        where: { id },
      })
      if (!contract) return
      await decorateContract(contract)
      return contract
    },

    async forUser(userId){
      const contracts = await db.contract.findMany({
        where: { userId }
      })
      await Promise.all(contracts.map(decorateContract))
      return contracts
    }
  },

  commands: {
    async offer(options){
      const {
        identifierDid,
        contractUrl,
        userId,
      } = options
      // TODO ensure identifierDid exists and is ours
      const contract = await jlinx.contracts.create()
      await contract.offerContract({
        identifier: identifierDid,
        contractUrl,
      })
      return await db.contract.create({
        data: {
          id: contract.id,
          userId
        },
      })
    },

    async sign({ contractId }){

    }
  },

  actions: {
    async offer({ currentUser, ...options }){
      return await contracts.commands.offer({
        identifierDid: options.identifierDid,
        contractUrl: options.contractUrl,
        userId: currentUser.id,
      })
    },
  },

  views: {
    'mine': async ({ currentUser }) => {
      return currentUser
        ? await contracts.queries.forUser(currentUser.id)
        : []
    },
    ':id': async ({ id }) => {
      return await contracts.queries.byId({ id })
    }
  }
}


export default contracts


async function decorateContract(contract){
  const jlinxContract = await jlinx.contracts.get(contract.id)
  Object.assign(contract, jlinxContract.value)
}
