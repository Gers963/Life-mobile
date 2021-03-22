import {validateResponse, showServerError, authHeaders} from './utils';

const BASE_URI = 'https://jsonplaceholder.typicode.com';
const PAGED = `${BASE_URI}/todos`;

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
