import { withSessionRoute } from '../../../lib/withSession'
import resources from '../../../resources'

console.log('!!resources', resources)

export default withSessionRoute(async (req, res) => {
  const actionId = req.query.actionId.join('/')
  console.log('TAKE ACTION', { actionId })

  const [resourceName, actionName] = parseActionId(actionId)
  console.log({ resourceName, actionName })

  const resource = resources[resourceName]
  if (!resource){
    return res.status(404).json({
      error: {
        message: `unknown resource "${resourceName}"`
      }
    })
  }
  if (!resource.actions || !resource.actions[actionName]){
    return res.status(404).json({
      error: {
        message: `unknown action "${actionId}"`
      }
    })
  }

  const result = await resource.actions[actionName]({
    currentUser: req.session.user,
  })
  console.log({ result })
  res.status(200).json(result)
})



function parseActionId(actionName) {
  const matches = actionName.match(/^([^\.]+)\.(.+$)/);
  return matches ? [matches[1], matches[2]] : [];
}
