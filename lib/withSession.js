import Cookies from 'cookies'
import sessionResource from '../resources/sessionResource'
const COOKIE_NAME = 'session-id'

export function withSessionRoute(handler) {
  return async function(req, res){
    const cookies = new Cookies(req, res)
    let sessionId = cookies.get(COOKIE_NAME)
    let session = await Session.open(sessionId)
    cookies.set(COOKIE_NAME, session.id, { httpOnly: true })
    Object.defineProperty(req, 'session', {
      enumerable: true,
      get() { return session },
    })
    await session.touch()
    return await handler(req, res)
  }
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

  async delete(){
    await sessionResource.commands.delete(this.id)
    // this._cookies.set(COOKIE_NAME, undefined)
  }
}
