import callApi from '../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const ERROR_CREATE_POST = 'ERROR_CREATE_POST'; 
export const ERROR_DELETE_POST = 'ERROR_DELETE_POST'; 

// Export Actions
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    return callApi('posts', 'post', {
      post: {
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl
      },
    }).then(({ data, res }) => dispatch(addPost(data.post)));
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return callApi('posts').then(({ data, res }) => {
      if (res.ok) {
        dispatch(addPosts(data.posts));
      } else {
        return dispatch(errorCreatePost())
      }
    });
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then(({ data, res }) => {
      if (res.ok) {
        return dispatch(addPost(data.post))
      } else {
        return dispatch(errorCreatePost())
      }
    }).catch(() => {
      dispatch(errorCreatePost())
    });
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function errorCreatePost() {
  return {
    type: ERROR_CREATE_POST
  };
}

export function errorDeletePost() {
  return {
    type: ERROR_DELETE_POST
  };
}

export function deletePostRequest(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'delete').then(({ _, res }) => {
      if (res.ok) {
        return dispatch(deletePost(cuid))
      } else {
        return dispatch(errorDeletePost())
      }
    }).catch(() => {
      dispatch(errorCreatePost())
    });
  };
}
