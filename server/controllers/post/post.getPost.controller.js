const Post = require('../../models/post');

module.exports = (app) => {
  getPost = async (req, res) => {
    Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ post });
    });
  };
  return getPost;
}
