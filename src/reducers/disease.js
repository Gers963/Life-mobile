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
    case Types.DISEASE:
      return {
        ...state,
        isLoading: true,
        error: '',
      }
    case Types.DISEASE_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false,
        skip: state.skip + action.rows.length,
        rows: action.rows,
      }
    case Types.DISEASE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case Types.DISEASE_CURRENT:
    return {
      ...state,
      isLoading: false,
      current: action.current,
    }
    default:
      return state
  }
}