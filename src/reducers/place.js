import * as Types from '../constants/actionTypes'

const initialState = {
  error: null,
  rows: [],
  current: {},
  isLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.PLACE:
      return {
        ...state,
        isLoading: true,
        error: '',
      }
    case Types.PLACE_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false,
        rows: action.rows,
      }
    case Types.PLACE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case Types.PLACE_CURRENT:
    return {
      ...state,
      current: action.current,
    }
    default:
      return state
  }
}