import { pathToRegexp, match, parse, compile } from 'path-to-regexp'

const resources = []

function defineResource(pattern, definition){
  const toPath = compile(pattern, { encode: encodeURIComponent });

  resources.push({
    ...definition,
    toPath,
    pattern
  })
}

function matchResource(resourceId){
  for (const resource of resources){
    const params = []
    const regexp = pathToRegexp(resource.pattern, params)
    const matches = regexp.exec(resourceId)
    if (matches){
      return {
        ...resource,
        params
      }
    }
  }
}


// import chat from './chat'
// import { matchResource } from './defineResource'
import('./chat').then(chat => {
  console.log('!?!?!?!', chat)
  chat.default(defineResource)
})

export default {
  async get(resourceId){

    console.log('resources.get', { resourceId, resources })
    const resource = matchResource(resourceId)
    console.log({ resource })
    return resource
  }
}

