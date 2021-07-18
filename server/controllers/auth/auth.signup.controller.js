const sanitizeHtml = require('sanitize-html');
const User = require('../../models/user');

module.exports = (app) => {
  const AuthService = require('../../services/auth')(app);
  const signup = async (req, res, next) => {
    // check parameters
    const name = req.body.name ? sanitizeHtml(req.body.name) : ''
    const username = req.body.username ? sanitizeHtml(req.body.username) : ''
    const passwordPlain = req.body.password ? sanitizeHtml(req.body.password) : ''
    if (!(username && passwordPlain && name)) {
      res.status(401).json({ message: 'invalid-parameters' });
      return
    }
    const existUser = await User.findOne({ username })
    if (existUser) {
      res.status(401).json({ message: 'error-exist-username' });
      return
    }
    // create user and send id
    const user = User({
      username,
      password: await User.createHashFromPassword(passwordPlain),
      name
    })
    await user.save()
    const payload = { id: user.id };
    const token = AuthService.getToken(payload)
    res.json({ token, name: user.name });
  }
  return signup
};
