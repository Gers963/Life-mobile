import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URI } from '../constants/config'

const api = axios.create({
  baseURL: BASE_URI,
});

// instance.interceptors.request.use(
//   async config => {
//     const access_token = await AsyncStorage.getItem('access_token');

//     if (!access_token) {
//       return config;
//     }
//     config.headers.Authorization = `Bearer ${access_token}`;

//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

export default api;
