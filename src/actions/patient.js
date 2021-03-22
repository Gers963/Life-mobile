import * as Types from '../constants/actionTypes';
import {Actions} from 'react-native-router-flux';

import {createpatient, updatepatient} from '../api/patient';
import {Alert} from 'react-native';

export const createPatient = patient => {
  return async dispatch => {
    dispatch({type: Types.PATIENT});
    try {
      const data = await createpatient(patient);
      Alert.alert('ClinicLabs', 'Usuário criado com sucesso.');
      dispatch(_success(data));
    } catch (error) {
      Alert.alert('ClinicLabs', 'Falha ao criar usuário');
      dispatch(_error(error));
    }
  };
};

export const updatePatient = (patient, id) => {
  return async dispatch => {
    dispatch({type: Types.PATIENT});
    try {
      const data = await updatepatient(patient, id);
      Alert.alert('ClinicLabs', 'Atualizado com sucesso.');      
      dispatch(_success(data));
    } catch (error) {
      Alert.alert('ClinicLabs', 'Falha ao atualizar');
      dispatch(_error(error));
    }
  };
};

export const setPatient = patient => {
  return async dispatch => {
    dispatch({type: Types.PATIENT});
    try {
      dispatch(_success(patient));
    } catch (error) {
      dispatch(_error(error));
    }
  };
};

export const clear = () => {
  return async dispatch => {
    dispatch({type: Types.PATIENT_CLEAR});
  };
};

const _success = data => {
  return {
    type: Types.PATIENT_SUCCESS,
    rows: data,
  };
};

const _error = error => {
  return {
    type: Types.PATIENT_ERROR,
    error,
  };
};
