module.exports = (app) => {
  return {
    login: require('./auth.login.controller')(app),
    signup: require('./auth.signup.controller')(app)
  }
};