import bcrypt from 'bcrypt'
import prisma from '../lib/prisma'
// import users from './usersResource'

const sessionResource = {

  queries: {
    async get(sessionId){
      return await prisma.session.findUnique({
        where: { id: sessionId },
        select: {
          id: true,
          createdAt: true,
          lastSeenAt: true,
          user: true,
          userId: true,
        }
      })
    }
  },

  commands: {
    async create(){
      return await prisma.session.create({ data: {} })
    },
    async touch(sessionId){
      return await prisma.session.create({
        data: { userId }
      })
    },
    async delete(sessionId){
      return await prisma.session.delete({
        where: { id: sessionId }
      })
    }
  },

  actions: {

    async signup({ session, email, password }){
      const passwordSalt = await bcrypt.genSalt(10)
      const passwordHash = await bcrypt.hash(password, passwordSalt)
      const user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          passwordSalt,
        }
      })
      session.userId = user.id;
      await session.save();
    },

    async login({ session, email, password }){
      const user = await prisma.user.findUnique({
        where: { email }
      })
      const match = await bcrypt.compare(password, user.passwordHash)
      console.log({ match })
      session.userId = user.id;
      await session.save();
    },

    async logout({ session }){
      console.log({ session }, {...session})
      delete session.userId
      await session.save();
    }
  },

  views: {
    'current': async ({ session }) => {
      return {...session}
    },

    'currentUser': async ({ session }) => {
      if (!session.userId) return null
      return await prisma.user.findUnique({
        where: { id: session.userId },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        }
      })
    },
  }
}


export default sessionResource
