import { ADD_COMMA_TO_NUMBER, FETCH_GLOBAL_STATS } from "../actions/stats";

const initialState = {
  globalStats: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GLOBAL_STATS:
      return {
        ...state,
        globalStats: action.globalStats,
      };

    default:
      return state;
  }
  return state;
};
