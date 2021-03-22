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
    case Types.SERVICE:
      return {
        ...state,
        isLoading: true,
        error: '',
      }
    case Types.SERVICE_CLEAR:
        return {
          ...initialState,
          skip: 0
        }
    case Types.SERVICE_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false,
        skip: state.skip + action.rows.length,
        rows: action.rows,
      }
    case Types.SERVICE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case Types.SERVICE_CURRENT:
    return {
      ...state,
      current: action.current,
    }
    default:
      return state
  }
}