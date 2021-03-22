import {validateResponse, showServerError, authHeaders} from './utils';
import {BASE_URI} from '../constants/config';

const SKIPPED = `${BASE_URI}/v1/professional?skip=$1`;
const CURRENT = `${BASE_URI}/v1/professional/$1`;

export const requestSkipped = async (skip = 0) => {
  try {
    const response = await fetch(SKIPPED.replace('$1', skip), {
      method: 'GET',
      headers: await authHeaders(),
    });
    await validateResponse(response);
    return await response.json();
  } catch (error) {
    showServerError(error);
  }
};

export const current = async id => {
  try {
    const response = await fetch(CURRENT.replace('$1', id), {
      method: 'GET',
      headers: await authHeaders(),
    });
    await validateResponse(response);
    return await response.json();
  } catch (error) {
    showServerError(error);
  }
};
