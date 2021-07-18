const Post = require('../../models/post');

module.exports = (app) => {
  const Auth = require('../../services/auth')(app);

  deletePost = async (req, res) => {
    Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
      if (err) {
        res.status(500).send(err);
        return
      }

      const token = req.headers.authorization.split(' ')[1];
      const dataToken = Auth.decodeToken(token);
      if (!(post.userId === dataToken.id)) {
        res.status(500).json({ message: 'invalid-user' });
        return
      }

      post.remove(() => {
        res.status(200).json({});
      });
    });
  };
  return deletePost;
}
