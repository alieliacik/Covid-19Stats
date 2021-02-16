import { FETCH_INFECTED_DATES, FETCH_USER_COUNTRY } from "../actions/user";
import { LOGOUT } from "../actions/auth";

const initialState = {
  userInfectedDates: [],
  userCountry: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INFECTED_DATES:
      return {
        ...state,
        userInfectedDates: action.userInfectedDates,
      };
    case FETCH_USER_COUNTRY:
      return {
        ...state,
        userCountry: action.userCountry,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
