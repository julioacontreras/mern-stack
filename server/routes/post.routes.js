module.exports = ({ app, router }) => {
  const PostController = require('../controllers/post')(app);

  router.route('/posts').get(PostController.getPosts);
  router.route('/posts/:cuid').get(PostController.getPost);
  router.route('/posts').post(app.auth.middleware.isAuthenticated, PostController.addPost);
  router.route('/posts/:cuid').delete(app.auth.middleware.isAuthenticated, PostController.deletePost);

  return router;
}
