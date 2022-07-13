import db from '../lib/prisma'
import jlinx from '../lib/jlinx'

const contracts = {
  queries: {

    async byId(){
      const contract = await db.contract.findUnique({
        where: { id },
      })
      if (!contract) return
      const jlinxContract = await jlinx.get(contract.id)
      await jlinxContract.update()
      Object.assign(contract, {
        state: jlinxContract.state,
        host: jlinxContract.host,
        identifierDid: jlinxContract.identifierDid,
        contractUrl: jlinxContract.contractUrl,
      })
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
      const contract = await jlinx.contracts.create({
        identifierDid: options.identifierDid,
        contractUrl: options.contractUrl,
      })
      console.log({ contract })
      const data = {
        id: contract.id,
        userId: context.currentUser.id,
      }
      return await db.contract.create({
        data,
      })
    },
  },

  actions: {
    async create(){

    },
  },

  views: {
    'mine': async ({ currentUser }) => {
      return currentUser
        ? await contracts.queries.forUser(currentUser.id)
        : []
    },
    ':id': async ({ id }) => {
      // session
    }
  }
}


export default contracts
