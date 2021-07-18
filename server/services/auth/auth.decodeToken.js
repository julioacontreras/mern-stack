const jwt = require('jsonwebtoken');

module.exports = (app) => {
	return (token) => {
		return jwt.verify(token, app.auth.options.secretOrKey);
	}
}
