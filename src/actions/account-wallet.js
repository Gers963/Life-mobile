import * as Types from '../constants/actionTypes'
import { Actions } from 'react-native-router-flux'

import {
  requestSkipped,
} from '../api/account-wallet'

export const accountWalletList = (skip) => {
  return async (dispatch) => {
    dispatch({ type: Types.ACCOUNT_WALLET })
    try {
      const data = await requestSkipped(skip)
      dispatch(_success(data))
    } catch (error) {
      dispatch(_error(error))
    }
  }
}

const _success = (data) => {
  return {
    type: Types.ACCOUNT_WALLET_SUCCESS,
    rows: data
  }
}

const _error = (error) => {
  return {
    type: Types.ACCOUNT_WALLET_ERROR,
    error
  }
}