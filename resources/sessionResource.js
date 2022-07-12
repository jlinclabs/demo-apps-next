import prisma from '../lib/prisma'
import users from './usersResource'

const session = {
  actions: {
    signup({ email, password }){
      users.commands.create({
        email,
        passwordHash,
        passwordSalt,
        // password
      })
      return { NOWAY: 11, args }
    },
    login(){

    },
  },

  views: {
    'current': async ({ currentUser }) => {
      return currentUser || null
    },
  }
}


export default session
