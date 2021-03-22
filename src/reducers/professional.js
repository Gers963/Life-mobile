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
    case Types.PROFESSIONAL:
      return {
        ...state,
        isLoading: true,
        error: '',
      }
    case Types.PROFESSIONAL_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false,
        skip: state.skip + action.rows.length,
        rows: action.rows,
      }
    case Types.PROFESSIONAL_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case Types.PROFESSIONAL_CURRENT:
    return {
      ...state,
      isLoading: false,
      current: action.current,
    }
    default:
      return state
  }
}