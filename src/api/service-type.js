import {validateResponse, showServerError, authHeaders} from './utils';
import {BASE_URI} from '../constants/config';

const PAGED = `${BASE_URI}/v1/service-type?limit=200&offset=0`;

export const requestPaged = async (skip = 0) => {
  try {
    const response = await fetch(PAGED.replace('$1', skip), {
      method: 'GET',
      headers: await authHeaders(),
    });
    await validateResponse(response);
    return await response.json();
  } catch (error) {
    showServerError(error);
  }
};
