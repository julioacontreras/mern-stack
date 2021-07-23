import { ADD_POST, ADD_POSTS, DELETE_POST, ERROR_CREATE_POST, ERROR_DELETE_POST } from './PostActions';

// Initial State
const initialState = {
  data: [],
  errorMessage: ''
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST :
      return {
        data: [action.post, ...state.data],
      };

    case ADD_POSTS :
      return {
        data: action.posts,
      };

    case DELETE_POST :
      return {
        data: state.data.filter(post => post.cuid !== action.cuid),
        errorMessage: state.errorMessage
      };
    
    case ERROR_CREATE_POST :
      return {
        data: state.data,
        errorMessage: 'Error trying create post',
      };

    case ERROR_DELETE_POST :
      return {
        data: state.data,
        errorMessage: 'Error trying delete post',
      };
  
    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getPosts = state => state.posts.data;

// Get post by cuid
export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// Export Reducer
export default PostReducer;
