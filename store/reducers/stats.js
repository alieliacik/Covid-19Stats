import {
  FETCH_COUNTRY_DAILY_STATS,
  FETCH_COUNTRY_TOTAL_STATS,
  FETCH_GLOBAL_STATS,
  FETCH_NEWS,
} from '../actions/stats'

const initialState = {
  countryTotals: [],
  globalStats: {},
  lastThirtyDaysStats: [],
  allCountryStats: [],
  allNews: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRY_TOTAL_STATS:
      return {
        ...state,
        countryTotals: action.countryTotals,
      }

    case FETCH_GLOBAL_STATS:
      return {
        ...state,
        globalStats: action.globalStats,
      }
    case FETCH_COUNTRY_DAILY_STATS:
      return {
        ...state,
        lastThirtyDaysStats: action.lastThirtyDaysStats,
        allCountryStats: action.allCountryStats,
      }
    case FETCH_NEWS:
      return {
        ...state,
        allNews: action.allNews,
      }
    default:
      return state
  }
  return state
}
