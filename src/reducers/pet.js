import * as Types from '../constants/actionTypes';

const initialState = {
  error: null,
  rows: [],
  current: {},
  isLoading: false,
  skip: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.PET:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case Types.PET_CLEAR:
      return {
        ...initialState,
        skip: 0,
      };
    case Types.PET_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false,
        skip: state.skip + action.rows.length,
        rows: action.rows,
      };
    case Types.PET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case Types.PET_CURRENT:
      return {
        ...state,
        current: action.current,
      };
    default:
      return state;
  }
};