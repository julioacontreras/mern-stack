module.exports = (app) => {
  const router = require('express').Router();

  require('./auth.routes')({ app, router });
  require('./post.routes')({ app, router });

  return router
}
