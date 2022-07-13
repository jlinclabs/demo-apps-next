const { pathToRegexp } = require('path-to-regexp')
import { withSessionRoute } from '../../../lib/withSession'
import resources from '../../../resources'

export default withSessionRoute(async (req, res) => {
  const viewId = req.query.viewId.join('/')
  console.log('GET VIEW', { viewId })

  const [resourceName, viewPart] = parseViewId(viewId)

  const resource = resources[resourceName]

  let view
  if (resource){
    for (const pattern in resource.views){
      const keys = []
      const regexp = pathToRegexp(pattern, keys)
      const matches = regexp.exec(viewPart)
      if (!matches) continue
      const params = {}
      keys.forEach((key, index) => {
        params[key.name] = matches[index + 1];
      })
      view = { pattern, params }
      break
    }
  }

  if (!view) {
    return res.status(400).json({
      error: {
        message: `invalid view "${viewId}"`
      }
    })
  }

  try{
    const value = await resource.views[view.pattern]({
      ...view.params,
      session: req.session,
      currentUser: req.session.user,
    })

    res.status(200).json({ value })
  }catch(error){
    res.status(500).json({
      error: {
        message: error.message,
        stack: error.stack,
      }
    })
  }

})



function parseViewId(actionOrViewId) {
  const matches = actionOrViewId.match(/^([^\.]+)\.(.+$)/);
  return matches ? [matches[1], matches[2]] : [];
}
