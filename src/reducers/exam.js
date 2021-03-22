import * as Types from '../constants/actionTypes'

const initialState = {
  error: null,
  rows: [],
  current: {},
  isLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.EXAM:
      return {
        ...state,
        isLoading: true,
        error: '',
      }
    case Types.EXAM_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false,
        rows: [...state.rows, ...action.rows],
      }
    case Types.EXAM_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case Types.EXAM_CURRENT:
    return {
      ...state,
      current: action.current,
    }
    default:
      return state
  }
}