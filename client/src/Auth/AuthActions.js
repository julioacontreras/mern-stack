import callApi from '../util/apiCaller';

// Export Constants
export const LOGIN_AUTH = 'LOGIN_AUTH';
export const LOGOUT_AUTH = 'LOOUT_AUTH';
export const SIGNUP_AUTH = 'SIGNUP_AUTH';
export const ERROR_LOGIN_AUTH = 'ERROR_LOGIN_AUTH';
export const ERROR_SIGNUP_AUTH = 'ERROR_SIGNUP_AUTH';

// Export Actions
export function login(res) {
  return {
    type: LOGIN_AUTH,
    token: res.token,
    name: res.name
  };
}

export function signup(res) {
  return {
    type: SIGNUP_AUTH,
    token: res.token,
    name: res.name
  };
}

export function logout() {
  return {
    type: LOGOUT_AUTH
  };
}

export function errorLogin() {
  return {
    type: ERROR_LOGIN_AUTH
  };
}

export function errorSignup() {
  return {
    type: ERROR_SIGNUP_AUTH
  };
}



export function loginRequest(user, callback) {
  return (dispatch) => {
    return callApi('auth/login', 'post', {
      username: user.username,
      password: user.password
    }).then(({ data, res }) => {
      if (res.ok) {
        dispatch(login(data));
        callback(data.token);
      } else {
        dispatch(errorLogin());
      }
    });
  };
}

export function logoutRequest(_) {
  return (dispatch) => {
    return callApi('auth/logout', 'post').then(_ => dispatch(logout()));
  };
}

export function signupRequest(user, callback) {
  return (dispatch) => {
    return callApi('auth/signup', 'post', {
      name: user.name,
      username: user.username,
      password: user.password
    }).then(({ data, res }) => {
      if (res.ok) {
        dispatch(signup(data));
        callback(data.token);
      } else {
        dispatch(errorSignup());
      }
    });
  };
}
