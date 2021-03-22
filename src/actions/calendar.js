import * as Types from '../constants/actionTypes'
import { Actions } from 'react-native-router-flux'

import {
  requestPaged, 
  requestPagedPlace, 
  requestPagedProfessional,
  requestPagedSub
} from '../api/calendar'

export const paged = (page, service) => {
  return async (dispatch) => {
    dispatch({ type: Types.CALENDAR })
    try {
      const data = await requestPaged(page, service)
      dispatch(_success(data))
    } catch (error) {
      dispatch(_error(error))
    }
  }
}

export const pagedSub = (page, service, telemedicine) => {
  return async (dispatch) => {
    dispatch({ type: Types.CALENDAR })
    try {
      const data = await requestPagedSub(page, service, telemedicine)
      dispatch(_success(data))
    } catch (error) {
      dispatch(_error(error))
    }
  }
}

export const pagedProfessional = (page, professional) => {
  return async (dispatch) => {
    dispatch({ type: Types.CALENDAR })
    try {
      const data = await requestPagedProfessional(page, professional)
      dispatch(_success(data))
    } catch (error) {
      dispatch(_error(error))
    }
  }
}

export const pagedPlaceDates = (place, service) => {
  return async (dispatch) => {
    dispatch({ type: Types.CALENDAR })
    try {
      const data = await requestPagedPlace(place, service)
      dispatch(_success(data))
    } catch (error) {
      dispatch(_error(error))
    }
  }
}

const _success = (current) => {
  return {
    type: Types.CALENDAR_CURRENT,
    current
  }
}

const _error = (error) => {
  return {
    type: Types.CALENDAR_ERROR,
    error
  }
}
