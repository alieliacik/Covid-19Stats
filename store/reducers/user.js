import { FETCH_INFECTED_DATES, FETCH_USER_COUNTRY } from '../actions/user'
import { LOGOUT } from '../actions/auth'

const initialState = {
  userInfectedDate: [],
  userCountry: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INFECTED_DATES:
      return {
        ...state,
        userInfectedDate: action.userInfectedDate,
      }
    case FETCH_USER_COUNTRY:
      return {
        ...state,
        userCountry: action.userCountry,
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
