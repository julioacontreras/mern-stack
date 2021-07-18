
module.exports = ({ app, router}) => {
  const AuthController = require('../controllers/auth')(app);

  router.route('/auth/signup').post(AuthController.signup);
  router.route('/auth/login').post(AuthController.login);
  router.route('/auth/logout').post(app.auth.middleware.logout);

  return router
};

