import bcrypt from 'bcrypt'
import prisma from '../lib/prisma'
import users from './usersResource'

const sessionResource = {
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
      return {}
    },
    async login({ session, email, password }){
      const user = await prisma.user.findUnique({
        where: { email }
      })
      const match = await bcrypt.compare(password, user.passwordHash)
      console.log({ match })
      session.userId = user.id;
      await session.save();
      return {}
    },
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
