// import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next"

// const sessionOptions = {
//   password: process.env.SESSION_SECRET,
//   cookieName: "session",
//   // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
//   cookieOptions: {
//     secure: process.env.NODE_ENV === "production",
//   },
// }

import Cookies from 'cookies'

import sessionResource from '../resources/sessionResource'
const COOKIE_NAME = 'session-id'

export function withSessionRoute(handler) {
  return async function(req, res){
    const cookies = new Cookies(req, res)
    let sessionId = cookies.get(COOKIE_NAME)
    let session = await Session.open(sessionId)
    console.log('\n\n\n---->session', session)
    console.log('\n\n\n---->session.id', session.id)
    console.log('\n\n\n---->session.id', {
      id: session.id,
      createdAt: session.createdAt,
      lastSeenAt: session.lastSeenAt,
      user: session.user,
      userId: session.userId,
    })
    cookies.set(COOKIE_NAME, session.id, { httpOnly: true })
    // if (sessionId) {
    //   session =
    //   await session.reload()
    // }else{
    //   session = await Session.create()
    //   sessionId = session.id

    // }

    Object.defineProperty(req, 'session', {
      enumerable: true,
      get() { return session },
    })

    return await handler(req, res)
  }
  return withIronSessionApiRoute(handler, sessionOptions)
}

class Session {

  static get(id){
    return sessionResource.queries.get(id)
  }

  static create(id){
    return sessionResource.commands.create()
  }

  static async open(id){
    let value
    if (id) { value = await Session.get(id) }
    if (!value){ value = await sessionResource.commands.create() }
    return new Session(value)
  }

  constructor(value){
    this._value = value
  }

  get id(){ return this._value?.id }
  get createdAt(){ return this._value?.createdAt }
  get lastSeenAt(){ return this._value?.lastSeenAt }
  get user(){ return this._value?.user }
  get userId(){ return this._value?.userId }

  async reload(){
    this._value = await Session.get(this.id)
  }

  async touch(){
    await sessionResource.commands.touch(this.id)
  }
}
