module.exports = (app) => {
  return {
    getToken: require('./auth.getToken')(app),
    decodeToken: require('./auth.decodeToken')(app)
  }
}
