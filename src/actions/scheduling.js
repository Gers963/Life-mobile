import * as Types from '../constants/actionTypes'
import { Actions } from 'react-native-router-flux'

import {
  requestSkipped,
  create,
  update,
  current,
  sendConfirmationMsg
} from '../api/scheduling'
import NavigationService from '../shared/NavigationService'

export const schedulingList = (skip, type) => {
  return async (dispatch) => {
    dispatch({ type: Types.SCHEDULING })
    try {
      const rows = await requestSkipped(skip, type)
      dispatch(_success(rows.content))
    } catch (error) {
      dispatch(_error(error))
    }
  }
}

export const schedulingCurrent = (id) => {
  return async (dispatch) => {
    dispatch({ type: Types.SCHEDULING })
    try {
      const data = await current(id)      
      dispatch(_current(data))
    } catch (error) {
      dispatch(_error(error))
    }
  }
}

export const schedulingCurrentClean = () => {
  return async (dispatch) => {
    dispatch({ type: Types.SCHEDULING })
    try {  
      dispatch(_currentClean())
    } catch (error) {
      dispatch(_error(error))
    }
  }
}

export const schedulingCreate = (scheduling) => {
  return async (dispatch) => {
    dispatch({ type: Types.SCHEDULING })
    try {
      const response = await create(scheduling)
      const json = await response.json();
      const final = await update(json)
      const sched = await final.json();  
      console.log(JSON.stringify(sched, null, 2));
      if (sched.id == null) {
        dispatch(_error(json));
        return;
      } 
      dispatch(_create(json))
    } catch (error) {
      dispatch(_error(error))
    }
  }
}

export const watsappSendMsg = (phone, calendar) => {
  return async () => {
    try {
      await sendConfirmationMsg(phone, calendar)
    } catch (error) {
      console.log(error)
    }
  }
}

export const schedulingReset = () => {
  return async (dispatch) => {
    dispatch({ type: Types.SCHEDULING_RESET })
  }
}

const _success = (rows) => {
  return {
    type: Types.SCHEDULING_SUCCESS,
    rows
  }
}

const _error = (error) => {
  return {
    type: Types.SCHEDULING_ERROR,
    error
  }
}

const _create = (current) => {  
  return {
    type: Types.SCHEDULING_CREATE,
    current
  }
}

const _current = (current) => {
  //NavigationService.topNavigate('SchedulingDetails');
  return {
    type: Types.SCHEDULING_CURRENT,
    current
  }
}

const _currentClean = () => {
  //NavigationService.topNavigate('SchedulingDetails');
  return {
    type: Types.SCHEDULING_CURRENT,
    current: null
  }
}

