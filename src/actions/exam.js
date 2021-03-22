import * as Types from '../constants/actionTypes'
import { Actions } from 'react-native-router-flux'

import {
  requestPaged,
} from '../api/exam'

export const paged = (page) => {
  return async (dispatch) => {
    dispatch({ type: Types.EXAM })
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
    type: Types.EXAM_SUCCESS,
    rows
  }
}

const _error = (error) => {
  return {
    type: Types.EXAM_ERROR,
    error
  }
}

export const current = (current) => {
  Actions.push('ExamDetailsScreen')
  return {
    type: Types.EXAM_CURRENT,
    current
  }
}
