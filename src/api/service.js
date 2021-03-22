import {validateResponse, showServerError, authHeaders} from './utils';
import {BASE_URI} from '../constants/config';

const SKIPPED = `${BASE_URI}/v1/service?type=$1&skip=$2`;

export const requestSkipped = async (skip = 0, type = null) => {
  try {
    const response = await fetch(
      SKIPPED.replace('$1', type).replace('$2', skip),
      {
        method: 'GET',
        headers: await authHeaders(),
      },
    );
    await validateResponse(response);
    return await response.json();
  } catch (error) {
    showServerError(error);
  }
};
