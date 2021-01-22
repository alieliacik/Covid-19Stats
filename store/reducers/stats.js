import {
  FETCH_COUNTRY_DAILY_STATS,
  FETCH_COUNTRY_TOTAL_STATS,
  FETCH_GLOBAL_STATS,
} from "../actions/stats";

const initialState = {
  countryTotals: [],
  globalStats: {},
  selectedCountryStats: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRY_TOTAL_STATS:
      return {
        ...state,
        countryTotals: action.countryTotals,
      };

    case FETCH_GLOBAL_STATS:
      return {
        ...state,
        globalStats: action.globalStats,
      };
    case FETCH_COUNTRY_DAILY_STATS:
      return {
        ...state,
        selectedCountryStats: action.selectedCountryStats,
      };
    default:
      return state;
  }
  return state;
};
