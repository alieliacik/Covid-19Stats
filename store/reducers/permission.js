import { GET_LOCATION } from "../actions/permission";

initialState = {
  userLocation: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION:
      return { ...state, userLocation: action.userLocation };
    default:
      return state;
  }
};
