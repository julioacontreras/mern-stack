import { LOGIN_AUTH, LOGOUT_AUTH, SIGNUP_AUTH, ERROR_LOGIN_AUTH, ERROR_SIGNUP_AUTH } from './AuthActions';
import { Cookies  } from 'react-cookie';

const cookies = new Cookies()

// Initial State
const initialState = {
  token: cookies.get('token'),
  name: cookies.get('name'),
  errorMessage: ''
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_AUTH:
    case SIGNUP_AUTH:
      if (action.token) {
        cookies.set('token', action.token)
        cookies.set('name', action.name)
      }
      return {
        token: action.token,
        name: action.name,
        errorMessage: ''
      };
    case LOGOUT_AUTH:
      cookies.set('token', '')
      cookies.set('name', '')
      return {
        token: '',
        name: '',
        errorMessage: ''
      }

    case ERROR_LOGIN_AUTH:
      return {
        token: state.token,
        name: state.name,
        errorMessage: 'Not exist username or password'
      }

    case ERROR_SIGNUP_AUTH:
      return {
        token: state.token,
        name: state.name,
        errorMessage: 'Try another username'
      }
    default:
      return state;
  }
};

// Export Reducer
export default AuthReducer;
