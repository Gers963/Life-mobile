import {validateResponse, showServerError, authHeaders} from './utils';

import {BASE_URI} from '../constants/config';
const PAGED = `${BASE_URI}/api/especs`;

export const requestPaged = async (page = 0) => {
  try {
    const response = await fetch(PAGED.replace('$1', page), {
      method: 'GET',
      headers: await authHeaders(),
    });
    await validateResponse(response);
    return await response.json();
  } catch (error) {
    showServerError(error);
  }
};
