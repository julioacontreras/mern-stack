const jwt = require('jsonwebtoken');

module.exports = (app) => {
	return (payload) => {
		return jwt.sign(payload, app.auth.options.secretOrKey);
	}
}
