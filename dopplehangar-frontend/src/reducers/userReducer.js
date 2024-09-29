import { LOGIN_SUCCESS, LOGOUT } from '../actions/userActions';

const initialState = {
  userId: null,
  username: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.username,
      };
    case LOGOUT:
      return {
        ...state,
        userId: null,
        username: null,
      };
    default:
      return state;
  }
};

export default userReducer;