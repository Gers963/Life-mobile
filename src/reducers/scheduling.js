import * as Types from '../constants/actionTypes'

const initialState = {
  error: null,
  rows: [],
  current: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  isModalDetails: false,
  skip: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SCHEDULING:
      return {
        ...state,
        current: null,
        isLoading: true,
        isModalDetails: false,
        error: '',
      }
    case Types.SCHEDULING_RESET:
      return {
        ...state,
        current: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        isModalDetails: false,
        error: '',
      }
    case Types.SCHEDULING_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false,
        skip: state.skip + action.rows.length,
        rows: action.rows,
      }
    case Types.SCHEDULING_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        error: action.error,
      }
    case Types.SCHEDULING_CURRENT:
      return {
        ...state,
        error: '',
        isLoading: false,
        isModalDetails: true,
        current: action.current,
      }
    case Types.SCHEDULING_CREATE:
        return {
          ...state,
          error: '',
          isLoading: false,
          isSuccess: true,
          //current: action.current,
          skip: state.skip + 1,
          //rows: [...state.rows, action.current]
        }
    default:
      return state
  }
}