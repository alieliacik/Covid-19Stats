import { AUTHENTICATE, IS_STILL_LOGGED_IN, LOGOUT } from "../actions/auth";

const initialState = {
  token: "",
  userId: "",
  email: "",
  isLoggedIn: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        email: action.email,
        isLoggedIn: action.isLoggedIn,
      };
    case IS_STILL_LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
