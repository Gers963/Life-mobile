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
    case Types.SERVICE_TYPE:
      return {
        ...state,
        isLoading: true,
        error: '',
      }
    case Types.SERVICE_TYPE_CLEAR:
        return {
          ...initialState,
          skip: 0
        }
    case Types.SERVICE_TYPE_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false,
        skip: state.skip + action.rows.length,
        rows: action.rows,
      }
    case Types.SERVICE_TYPE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case Types.SERVICE_TYPE_CURRENT:
    return {
      ...state,
      current: action.current,
    }
    default:
      return state
  }
}