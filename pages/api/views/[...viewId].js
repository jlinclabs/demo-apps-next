import views from '../../../views/*'

console.log('!!views', views)

export default async function(req, res) {
  const viewId = req.query.viewId.join('/')
  console.log('GET VIEW', { viewId })

  res.status(200).json({
    viewId,
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
}
