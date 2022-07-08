import resources from '../../../resources'

export default async function(req, res) {
  const resourceId = req.query.resourceId.join('/')
  console.log('RESOURCE OPEN', { resourceId })

  const resource = await resources.get(resourceId)
  if (!resource){
    return res.status(404).json({ notFound: resourceId })
  }
  const unsub = resource.onChange(value => {
    console.log('RESOURCE UPDATE', value)
    res.write(`data: ${JSON.stringify(value)}\n\n`)
  })

  res.writeHead(200, {
    'Content-Encoding': 'none',
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  })

  req.on('close', () => {
    unsub()
    console.log(`RESOURCE CLOSED`, { resourceId });
  })
}
