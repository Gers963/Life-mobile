import {validateResponse, showServerError, authHeaders} from './utils';
import {BASE_URI} from '../constants/config';

const CREATE = `${BASE_URI}/pet/register`;
const UPDATE = `${BASE_URI}/pet/`;

export const createpet = async petBody => {
  try {
    const response = await fetch(CREATE, {
      method: 'POST',
      headers: await authHeaders(),
      body: JSON.stringify(petBody),
    });
    await validateResponse(response);
    return await response.json();
  } catch (error) {
    showServerError(error);
  }
};

export const updatepet = async (petBody, id) => {  
  try {
    const response = await fetch(UPDATE + id, {
      method: 'PUT',
      headers: await authHeaders(),
      body: JSON.stringify(petBody),
    });
    await validateResponse(response);
    return await response.json();
  } catch (error) {
    showServerError(error);
  }
};
