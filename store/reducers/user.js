import { FETCH_INFECTED_DATES } from "../actions/user";

const initialState = {
  userInfectedDates: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INFECTED_DATES:
      return {
        ...state,
        userInfectedDates: action.userInfectedDates,
      };
    default:
      return state;
  }
};
