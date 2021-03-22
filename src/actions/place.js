import * as Types from '../constants/actionTypes'
import { Actions } from 'react-native-router-flux'

import {
  requestPaged,
} from '../api/place'

export const pagedPlace = (page) => {
  return async (dispatch) => {
    dispatch({ type: Types.PLACE })
    try {
      const data = await requestPaged(page)
      dispatch(_success(data.content))
    } catch (error) {
      dispatch(_error(error))
    }
  }
}

const _success = (rows) => {
  return {
    type: Types.PLACE_SUCCESS,
    rows
  }
}

const _error = (error) => {
  return {
    type: Types.PLACE_ERROR,
    error
  }
}
