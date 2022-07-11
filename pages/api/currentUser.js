import { withSessionRoute } from 'lib/withSession'

export default withSessionRoute((req, res) => {
  res.send({
    user: req.session.user
  })
})
