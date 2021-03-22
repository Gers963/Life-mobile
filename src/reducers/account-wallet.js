import * as Types from '../constants/actionTypes'

const initialState = {
  error: null,
  rows: [],
  current: {},
  isLoading: false,
  skip: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.ACCOUNT_WALLET:
      return {
        ...state,
        isLoading: true,
        error: '',
      }
    case Types.ACCOUNT_WALLET_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false,
        skip: state.skip + action.rows.length,
        rows: [...state.rows, ...action.rows],
      }
    case Types.ACCOUNT_WALLET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case Types.ACCOUNT_WALLET_CURRENT:
    return {
      ...state,
      current: action.current,
    }
    default:
      return state
  }
}