import { createStore } from 'redux';


const persistedUser = localStorage.getItem('user');


const initialState = {
  user: persistedUser ? JSON.parse(persistedUser) : null, 
};


const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';


export const login = (userId, username) => ({
  type: LOGIN,
  payload: { userId, username },
});

export const logout = () => ({
  type: LOGOUT,
});


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
  const { userId, username } = action.payload;
  localStorage.setItem('user', JSON.stringify({ userId, username }));
  return { ...state, user: { userId, username } };
    case LOGOUT:
      localStorage.removeItem('user'); 
      return { ...state, user: null };
    default:
      return state;
  }
};

const store = createStore(authReducer);

export default store;
