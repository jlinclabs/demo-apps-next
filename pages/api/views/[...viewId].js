const { pathToRegexp } = require('path-to-regexp')
import { withSessionRoute } from '../../../lib/withSession'
import resources from '../../../resources'

console.log('!!resources', resources)

export default withSessionRoute(async (req, res) => {

  const viewId = req.query.viewId.join('/')
  console.log('GET VIEW', { viewId })

  const [resourceName, viewPart] = parseViewId(viewId)
  console.log({ resourceName, viewPart })

  const resource = resources[resourceName]
  if (!resource){
    return res.status(400).json({
      error: `unknown view "${viewId}"`
    })
  }

  console.log({ resource })

  for (const viewPattern in resource.views){
    const keys = []
    const regexp = pathToRegexp(viewPattern, keys)
    const matches = regexp.exec(viewPart)
    if (!matches) continue
    const params = {}
    keys.forEach((key, index) => {
      params[key.name] = matches[index + 1];
    })
    const value = await resource.views[viewPattern]({
      ...params,
      currentUser: req.session.user,
    })
    console.log({ value })
    res.status(200).json(value)
    return
  }

  res.status(404).json({
    viewId,
    currentUser: req.session.user,
  })
  // const resource = await resources.get(viewId)
  // if (!resource){
  //   return res.status(404).json({ notFound: viewId })
  // }
  // const unsub = resource.onChange(value => {
  //   console.log('RESOURCE UPDATE', value)
  //   res.write(`data: ${JSON.stringify(value)}\n\n`)
  // })

  // res.writeHead(200, {
  //   'Content-Encoding': 'none',
  //   'Content-Type': 'text/event-stream',
  //   'Connection': 'keep-alive',
  //   'Cache-Control': 'no-cache'
  // })

  // req.on('close', () => {
  //   unsub()
  //   console.log(`RESOURCE CLOSED`, { resourceId });
  // })
})



function parseViewId(actionOrViewId) {
  const matches = actionOrViewId.match(/^([^\.]+)\.(.+$)/);
  return matches ? [matches[1], matches[2]] : [];
}
