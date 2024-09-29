export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginSuccess = (userId, username) => ({
  type: LOGIN_SUCCESS,
  payload: { userId, username }
});