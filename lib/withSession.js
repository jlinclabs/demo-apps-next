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
import { v4 as uuid } from 'uuid'

import sessionResource from '../resources/sessionResource'
const COOKIE_NAME = 'session-id'

export function withSessionRoute(handler) {
  return async function(req, res){

    req.getSession = async () => {
      let session
      if (req.sessionId){
        session = await sessionResource.queries.get(req.sessionId)
      }
      console.log('!?>!?!?!!?!', session)
      return session || {id: req.sessionId}
    }

    const cookies = new Cookies(req, res)
    req.sessionId = cookies.get(COOKIE_NAME)
    if (!req.sessionId) {
      req.sessionId = uuid()
      cookies.set(COOKIE_NAME, req.sessionId, { httpOnly: true })
    }else{
      req.session = await req.getSession()
    }

    console.log('withSessionRoute', {
      sessionId: req.sessionId,
      session: req.session,
    })
    return await handler(req, res)
  }
  return withIronSessionApiRoute(handler, sessionOptions)
}
