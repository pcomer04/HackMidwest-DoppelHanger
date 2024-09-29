export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = (userId, username) => ({
  type: LOGIN_SUCCESS,
  payload: { userId, username }
});

export const logout = () => ({
  type: LOGOUT
});