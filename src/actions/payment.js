import * as Types from '../constants/actionTypes'
import { Actions } from 'react-native-router-flux'

import {
  requestPaged,
} from '../api/payment'

export const paged = (page) => {
  return async (dispatch) => {
    dispatch({ type: Types.PAYMENT })
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
    type: Types.PAYMENT_SUCCESS,
    rows
  }
}

const _error = (error) => {
  return {
    type: Types.PAYMENT_ERROR,
    error
  }
}

export const current = (current) => {
  Actions.push('PaymentDetailsScreen')
  return {
    type: Types.PAYMENT_CURRENT,
    current
  }
}
