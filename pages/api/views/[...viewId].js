const { pathToRegexp } = require('path-to-regexp')
import { withSessionRoute } from '../../../lib/withSession'
import resources from '../../../resources'

export default withSessionRoute(async (req, res) => {
  console.log('GET VIEW', {session: req.session})
  const subId = req.query.subId
  const viewId = req.query.viewId.join('/')
  console.log('GET VIEW', { subId, viewId })

  const [resourceName, viewPart] = parseViewId(viewId)
  console.log({ resourceName, viewPart })

  const resource = resources[resourceName]
  if (!resource){
    return res.status(400).json({
      error: `unknown view "${viewId}"`
    })
  }

  console.log({ resource })

  let view
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

  if (!view) {
    return res.status(404).json({ notFound: true, viewId })
  }

  req.on('close', () => {
    console.log(`VIEW CLOSED`, { subId, viewId });
  })

  res.writeHead(200, {
    'Content-Encoding': 'none',
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'X-Accel-Buffering': 'no',
  })

  const emit = data => {
    res.write(
      // `event: update\ndata: ${JSON.stringify(data)}\n\n`
      `data: ${JSON.stringify(data)}\n\n`
    )
  }

  const update = async () => {
    console.log('VIEW UPDATE???', subId, {
      'req.__CLOSED': req.__CLOSED,
      'res.complete': res.complete,
    })
    // req.open?
    // todo get latest session
    const value = await resource.views[view.pattern]({
      ...view.params,
      session: req.session,
      currentUser: req.session.user,
    })
    console.log('VIEW CHANGE', { subId, [viewId]: value })
    emit(value)
  }

  // const unsub = resource.onChange(value => {
  //   console.log('VIEW UNSUB', value)
  //   res.write(`data: ${JSON.stringify(value)}\n\n`)
  // })
  let intervalId
  // TMP use postgres
  // intervalId = setInterval(
  //   () => {
  //     update()
  //   },
  //   10000
  // )
  const unsub = () => { clearInterval(intervalId) }

  req.on('close', () => {
    req.__CLOSED = true
    unsub()
    console.log(`VIEW CLOSED`, { subId, viewId });
  })

  await update()



})



function parseViewId(actionOrViewId) {
  const matches = actionOrViewId.match(/^([^\.]+)\.(.+$)/);
  return matches ? [matches[1], matches[2]] : [];
}
