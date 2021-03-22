import {validateResponse, showServerError, authHeaders} from './utils';
import {BASE_URI} from '../constants/config';

const SKIPPED = `${BASE_URI}/v1/place`;

export const requestPaged = async (skip = 0, type = null) => {
  try {
    const response = await fetch(SKIPPED, {
      method: 'GET',
      headers: await authHeaders(),
    });
    await validateResponse(response);
    return await response.json();
  } catch (error) {
    showServerError(error);
  }
};
