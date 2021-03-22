import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
import NavigationService from '../shared/NavigationService';

let token;

export const validateResponse = async response => {
  if (response.status === 403) {
    await requestLogOut();
    NavigationService.topNavigate('Main');
  }

  if (response.status === 500) {
    throw new Error('Request error. Please try again later.');
  }
};

export const requestIsUserAuthenticated = async () => {
  token = await AsyncStorage.getItem('token');
  if (token) {
    return true;
  }
  return false;
};

export const requestLogOut = async () => {
  await AsyncStorage.removeItem('token');
};

export const showServerError = error => {
  Alert.alert('Error', `${error.message}`);
};

export const authHeaders = async () => {
  token = await AsyncStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    // eslint-disable-next-line prettier/prettier
    'Authorization': `Bearer ${token}`,
  };
};
