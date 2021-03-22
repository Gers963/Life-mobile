import * as Types from '../constants/actionTypes';

import {createpet, updatepet} from '../api/pet';
import {Alert} from 'react-native';

export const createPet = petBody => {
  return async dispatch => {
    dispatch({type: Types.PET});
    try {
      const data = await createpet(petBody);
      Alert.alert('LifePet', 'Pet criado com sucesso.');
      dispatch(_success(data));
    } catch (error) {
      Alert.alert('LifePet', 'Falha ao criar pet');
      dispatch(_error(error));
    }
  };
};

export const updatePet = (petBody, id) => {
  return async dispatch => {
    dispatch({type: Types.PET});
    try {
      const data = await updatepet(petBody, id);
      Alert.alert('LifePet', 'Atualizado com sucesso.');      
      dispatch(_success(data));
    } catch (error) {
      Alert.alert('LifePet', 'Falha ao atualizar');
      dispatch(_error(error));
    }
  };
};

export const setPet = petBody => {
  return async dispatch => {
    dispatch({type: Types.PET});
    try {
      dispatch(_success(petBody));
    } catch (error) {
      dispatch(_error(error));
    }
  };
};

export const clear = () => {
  return async dispatch => {
    dispatch({type: Types.PET_CLEAR});
  };
};

const _success = data => {
  return {
    type: Types.PET_SUCCESS,
    rows: data,
  };
};

const _error = error => {
  return {
    type: Types.PET_ERROR,
    error,
  };
};
