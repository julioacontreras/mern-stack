const Post = require('../../models/post');

module.exports = (app) => {
  getPosts = async (req, res) => {
    Post.find().sort('-dateAdded').exec((err, posts) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ posts });
    });
  };
  return getPosts;
}
