import * as Types from '../constants/actionTypes';
import {Actions} from 'react-native-router-flux';

import {requestPaged} from '../api/service-type';

export const serviceTypeList = page => {
  return async dispatch => {
    dispatch({type: Types.SERVICE_TYPE});
    try {
      const data = await requestPaged(page);
      dispatch(_success(data.content));
    } catch (error) {
      dispatch(_error(error));
    }
  };
};

const _success = data => {
  return {
    type: Types.SERVICE_TYPE_SUCCESS,
    rows: data,
  };
};

const _error = error => {
  return {
    type: Types.SERVICE_TYPE_ERROR,
    error,
  };
};

export const current = current => {
  Actions.push('ServiceTypeDetailScreen');
  return {
    type: Types.SERVICE_TYPE_CURRENT,
    current,
  };
};
