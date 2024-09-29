import { LOGIN_SUCCESS } from '../actions/userActions';

const initialState = {
  userId: localStorage.getItem('userId') || null,
  username: localStorage.getItem('username') || null, 
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.username,
      };
    default:
      return state;
  }
};

export default userReducer;
