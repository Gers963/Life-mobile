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
    case Types.PATIENT:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case Types.PATIENT_CLEAR:
      return {
        ...initialState,
        skip: 0,
      };
    case Types.PATIENT_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false,
        skip: state.skip + action.rows.length,
        rows: action.rows,
      };
    case Types.PATIENT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case Types.PATIENT_CURRENT:
      return {
        ...state,
        current: action.current,
      };
    default:
      return state;
  }
};
