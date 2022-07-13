import db from '../lib/prisma'
import jlinx from '../lib/jlinx'

const contracts = {
  queries: {

    async byId({ id }){
      const contract = await db.contract.findUnique({
        where: { id },
      })
      if (!contract) return
      const jlinxContract = await jlinx.contracts.get(contract.id)
      // await jlinxContract.update()
      console.log('GET CONTRACT', { jlinxContract })
      Object.assign(contract, jlinxContract.value)
      // Object.assign(contract, {
      //   state: jlinxContract.state,
      //   host: jlinxContract.host,
      //   identifierDid: jlinxContract.identifierDid,
      //   contractUrl: jlinxContract.contractUrl,
      // })
      console.log('GET CONTRACT', id, contract)
      return contract
    },

    async forUser(userId){
      return db.contract.findMany({
        where: { userId }
      })
    }
  },

  commands: {
    async offer(options){
      const {
        identifierDid,
        contractUrl,
        userId,
      } = options
      console.log('CREATE CONTRACT', {
        identifierDid,
        contractUrl,
        userId,
      })
      // TODO ensure identifierDid exists and is ours
      const contract = await jlinx.contracts.create()
      await contract.offerContract({
        identifier: identifierDid,
        contractUrl,
      })
      console.log({ contract })
      return await db.contract.create({
        data: {
          id: contract.id,
          userId
        },
      })
    },
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
