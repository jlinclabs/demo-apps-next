import { withSessionRoute } from '../../../lib/withSession'
import resources from '../../../resources'

console.log('!!resources', resources)

export default withSessionRoute(async (req, res) => {
  try{
    const actionId = req.query.actionId.join('/')
    const options = JSON.parse(req.body)
    console.log('TAKE ACTION', {
      actionId,
      options,
      session: req.session,
    })

    const [resourceName, actionName] = parseActionId(actionId)
    console.log({ resourceName, actionName })

    const resource = resources[resourceName]
    if (!resource){
      bail(404, `unknown resource "${resourceName}"`)
    }
    if (!resource.actions || !resource.actions[actionName]){
      bail(404, `unknown action "${actionId}"`)
    }

    const result = await resource.actions[actionName]({
      ...options,
      session: req.session,
      currentUser: req.session.user,
    })
    console.log({ result })
    return res.status(200).json(result)

  }catch(error){
    console.error(error)
    res.status(error.statusCode || 500).json({
      error: {
        message: error.message,
        stack: error.stack,
      }
    })
  }
})



function parseActionId(actionName) {
  const matches = actionName.match(/^([^\.]+)\.(.+$)/);
  return matches ? [matches[1], matches[2]] : [];
}

function bail(statusCode, message){
  const error = new Error(message)
  error.statusCode = statusCode
  throw error
}
