import Cookies from 'cookies'
import sessionResource from '../resources/sessionResource'
const COOKIE_NAME = 'session-id'

export function withSessionRoute(handler) {
  return async function(req, res){
    // const cookies = new Cookies(req, res)
    // let sessionId = cookies.get(COOKIE_NAME)
    // let session = await Session.open(sessionId)

    // cookies.set(COOKIE_NAME, session.id, { httpOnly: true })
    // await session.touch()

    const session = await Session.open(req, res)

    console.log('\n\n\n\n !! session !!', session)

    Object.defineProperty(req, 'session', {
      enumerable: true,
      get() { return session },
    })

    return await handler(req, res)
  }
}

class Session {

  static async open(req, res){
    const session = new Session(req, res)
    if (session.id) await session.reload()

    if (!session.createdAt) {
      console.log('SESSION creating new session', session)
      session._value = await sessionResource.commands.create()
      cookies.set(COOKIE_NAME, session.id, { httpOnly: true })
    }
    console.log('SESSION OPEN', session)
    return session
    // // session.open()
    // let value
    // if (id) { value = await Session.get(id) }
    // if (!value){ value = await sessionResource.commands.create() }
    // return new Session(value)
  }

  static get(id){
    return
  }

  static create(id){
    return sessionResource.commands.create()
  }

  constructor(req, res){
    this._cookies = new Cookies(req, res)
    this._id = this._cookies.get(COOKIE_NAME)
  }

  get id(){ return this._id }
  get createdAt(){ return this._value?.createdAt }
  get lastSeenAt(){ return this._value?.lastSeenAt }
  get user(){ return this._value?.user }
  get userId(){ return this._value?.userId }

  async reload(){
    this._value = await sessionResource.queries.get(this.id)
  }

  async touch(){
    await sessionResource.commands.touch(this.id)
  }

  async delete(){
    await sessionResource.commands.delete(this.id)
    // this._cookies.set(COOKIE_NAME, undefined)
  }


  [Symbol.for('nodejs.util.inspect.custom')] (depth, opts) {
    let indent = ''
    if (typeof opts.indentationLvl === 'number') { while (indent.length < opts.indentationLvl) indent += ' ' }

    return this.constructor.name + '(\n' +
      indent + '  id: ' + opts.stylize(this.id, 'string') + '\n' +
      indent + '  createdAt: ' + opts.stylize(this.createdAt, 'date') + '\n' +
      indent + '  lastSeenAt: ' + opts.stylize(this.lastSeenAt, 'date') + '\n' +
      indent + '  userId: ' + opts.stylize(this.userId, 'number') + '\n' +
      indent + ')'
  }

}
