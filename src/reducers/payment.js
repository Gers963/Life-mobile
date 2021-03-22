import * as Types from '../constants/actionTypes'

const initialState = {
  error: null,
  rows: [],
  current: {},
  isLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.PAYMENT:
      return {
        ...state,
        isLoading: true,
        error: '',
      }
    case Types.PAYMENT_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false,
        rows: [...state.rows, ...action.rows],
      }
    case Types.PAYMENT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case Types.PAYMENT_CURRENT:
    return {
      ...state,
      current: action.current,
    }
    default:
      return state
  }
}