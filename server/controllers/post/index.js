module.exports = (app) => {
    return {
      getPosts: require('./post.getPosts.controller')(app),
      getPost: require('./post.getPost.controller')(app),
      addPost: require('./post.addPost.controller')(app),
      deletePost: require('./post.deletePost.controller')(app)
    }
  };
