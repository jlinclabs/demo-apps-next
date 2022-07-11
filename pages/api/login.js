import { withSessionRoute } from 'lib/withSession'

export default withSessionRoute(async (req, res) => {
  // get user from database then:
  req.session.user = {
    id: 230,
    admin: true,
  };
  await req.session.save();
  res.send({ ok: true });
});
