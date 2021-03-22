import * as Types from '../constants/actionTypes'
import { Actions } from 'react-native-router-flux'

import {
  requestPaged,
} from '../api/attendance'

export const paged = (page) => {
  return async (dispatch) => {
    dispatch({ type: Types.ATTENDANCE })
    try {
      const data = await requestPaged(page)
      dispatch(_success(data))
    } catch (error) {
      dispatch(_error(error))
    }
  }
}

const _success = (rows) => {
  return {
    type: Types.ATTENDANCE_SUCCESS,
    rows
  }
}

const _error = (error) => {
  return {
    type: Types.ATTENDANCE_ERROR,
    error
  }
}

export const current = (current) => {
  Actions.push('AttendanceDetailsScreen')
  return {
    type: Types.ATTENDANCE_CURRENT,
    current
  }
}
