import db from '../lib/prisma'
import jlinx from '../lib/jlinx'

const contracts = {
  queries: {

    async byId({ id }){
      const [contractRecord, jlinxContract] = await Promise.all([
        db.contract.findUnique({ where: { id } }),
        jlinx.contracts.get(id),
      ])
      if (!jlinxContract) return
      const contract = {...jlinxContract.value}
      if (contractRecord){
        contract.userId = contractRecord.userId
        contract.createdAt = contractRecord.createdAt
      }
      // if (!contract) return
      // await decorateContract(contract)
      return contract
    },

    async forUser({ userId }){
      const contracts = await db.contract.findMany({
        where: { userId }
      })
      await Promise.all(
        contracts.map(async contract => {
          const jlinxContract = await jlinx.contracts.get(contract.id)
          Object.assign(contract, jlinxContract.value)
        })
      )
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

    async sign({ contractId, userId, identifierDid }){

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
    async sign({ currentUser, contractId, identifierDid }){
      // TODO ensure signAs identifier did is owned by us
      return await contracts.commands.sign({
        userId: currentUser.id,
        contractId,
        identifierDid,
      })
    }
  },

  views: {
    'mine': async ({ currentUser }) => {
      return currentUser
        ? await contracts.queries.forUser({ userId: currentUser.id })
        : []
    },
    ':id': async ({ id }) => {
      return await contracts.queries.byId({ id })
    }
  }
}


export default contracts

