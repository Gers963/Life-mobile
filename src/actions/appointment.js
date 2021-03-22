import * as Types from '../constants/actionTypes'
import { Actions } from 'react-native-router-flux'

import {
  requestPaged,
} from '../api/appointment'

export const paged = (page) => {
  return async (dispatch) => {
    dispatch({ type: Types.APPOINTMENT })
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
    type: Types.APPOINTMENT_SUCCESS,
    rows
  }
}

const _error = (error) => {
  return {
    type: Types.APPOINTMENT_ERROR,
    error
  }
}

export const current = (current) => {
  Actions.push('AppointmentDetailsScreen')
  return {
    type: Types.APPOINTMENT_CURRENT,
    current
  }
}
