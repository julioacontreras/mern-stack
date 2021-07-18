const Post = require('../../models/post');
const User = require('../../models/user');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');

module.exports = (app) => {
  const Auth = require('../../services/auth')(app);

  addPost = async (req, res) => {
    if (!req.body.post.title || !req.body.post.content) {
      res.status(403).end();
      return
    }

    const token = req.headers.authorization.split(' ')[1];
    const dataToken = Auth.decodeToken(token);
    const user = await User.findOne({ _id: dataToken.id })
    if (!user) {
      res.status(500).send('not-found-user');
    }

    const newPost = new Post(req.body.post);
    // Let's sanitize inputs
    newPost.title = sanitizeHtml(newPost.title);
    newPost.content = sanitizeHtml(newPost.content);
    newPost.name = sanitizeHtml(user.name);
    newPost.userId = sanitizeHtml(user.id);
  
    newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
    newPost.cuid = cuid();
    newPost.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
        return
      }
      res.json({ post: saved });
    });
  };

  return addPost
};
