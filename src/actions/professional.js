import * as Types from '../constants/actionTypes'
import { Actions } from 'react-native-router-flux'

import {
  requestSkipped, current
} from '../api/professional'
import NavigationService from '../shared/NavigationService'

export const cooperatorList = (skip, type) => {
  return async (dispatch) => {
    dispatch({ type: Types.PROFESSIONAL })
    try {
      const rows = await requestSkipped(skip, type)
      dispatch(_success(rows.content))
    } catch (error) {
      dispatch(_error(error))
    }
  }
}

export const cooperatorCurrent = (id) => {
  return async (dispatch) => {
    dispatch({ type: Types.PROFESSIONAL })
    try {
      const data = await current(id)
      dispatch(_current(data))
    } catch (error) {
      dispatch(_error(error))
    }
  }
}

const _success = (rows) => {
  return {
    type: Types.PROFESSIONAL_SUCCESS,
    rows
  }
}

const _error = (error) => {
  return {
    type: Types.PROFESSIONAL_ERROR,
    error
  }
}

export const _current = (current) => {
  NavigationService.topNavigate('CooperatorDetails')
  return {
    type: Types.PROFESSIONAL_CURRENT,
    current
  }
}
