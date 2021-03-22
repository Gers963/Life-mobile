import * as Types from '../constants/actionTypes'
import { Actions } from 'react-native-router-flux'

import {
  requestSkipped,
} from '../api/service'

export const serviceList = (skip, type) => {
  return async (dispatch) => {
    dispatch({ type: Types.SERVICE })
    try {
      const data = await requestSkipped(skip, type)
      dispatch(_success(data.content))
    } catch (error) {
      dispatch(_error(error))
    }
  }
}

export const clear = () => {
  return async (dispatch) => {
    dispatch({ type: Types.SERVICE_CLEAR })
  }
}

const _success = (data) => {
  return {
    type: Types.SERVICE_SUCCESS,
    rows: data
  }
}

const _error = (error) => {
  return {
    type: Types.SERVICE_ERROR,
    error
  }
}
