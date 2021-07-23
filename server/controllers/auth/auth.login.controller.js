const sanitizeHtml = require('sanitize-html');
const User = require('../../models/user');

module.exports = (app) => {
  const AuthService = require('../../services/auth')(app);
  const login = async (req, res) =>{
    // check parameters
    const username = req.body.username ? sanitizeHtml(req.body.username) : ''
    const password = req.body.password ? sanitizeHtml(req.body.password) : ''
    if (!(username && password)) {
      res.status(401).json({ message: 'invalid-parameters' });
      return
    }
    // find user & check password
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: 'no-such-user-found' });
      return
    }
    const isValid = await User.isValidPassword(user, password)
    if (isValid === true) {
      // send token to put in request header
      const payload = { id: user.id };
      const token = AuthService.getToken(payload)
      res.json({ token, name: user.name });
    } else {
      res.status(401).json({ message: 'passwords-did-not-match' });
    }
  }
  return login
};
