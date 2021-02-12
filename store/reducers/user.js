import { FETCH_INFECTED_DATES, FETCH_USER_COUNTRY } from "../actions/user";

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
    default:
      return state;
  }
};
