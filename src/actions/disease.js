import * as Types from '../constants/actionTypes';
import {Actions} from 'react-native-router-flux';

import {requestSkipped, current} from '../api/disease';
import NavigationService from '../shared/NavigationService';

export const diseaseList = (skip, type) => {
  return async dispatch => {
    dispatch({type: Types.DISEASE});
    try {
      const rows = await requestSkipped(skip, type);
      dispatch(_success(rows.content));
    } catch (error) {
      dispatch(_error(error));
    }
  };
};

const _success = rows => {
  return {
    type: Types.DISEASE_SUCCESS,
    rows,
  };
};

const _error = error => {
  return {
    type: Types.DISEASE_ERROR,
    error,
  };
};

export const _current = current => {
  NavigationService.topNavigate('CooperatorDetails');
  return {
    type: Types.DISEASE_CURRENT,
    current,
  };
};
