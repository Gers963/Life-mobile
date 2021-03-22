import {validateResponse, showServerError, authHeaders} from './utils';
import {BASE_URI} from '../constants/config';

const CREATE = `${BASE_URI}/v1/user-system`;
const UPDATE = `${BASE_URI}/v1/patient/`;

export const createpatient = async patient => {
  try {
    const response = await fetch(CREATE, {
      method: 'POST',
      headers: await authHeaders(),
      body: JSON.stringify(patient),
    });
    await validateResponse(response);
    return await response.json();
  } catch (error) {
    showServerError(error);
  }
};

export const updatepatient = async (patient, id) => {  
  try {
    const response = await fetch(UPDATE + id, {
      method: 'PUT',
      headers: await authHeaders(),
      body: JSON.stringify(patient),
    });
    await validateResponse(response);
    return await response.json();
  } catch (error) {
    console.log(JSON.stringify(error, null, 2))
    showServerError(error);
  }
};
