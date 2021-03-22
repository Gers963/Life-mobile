import {validateResponse, showServerError, authHeaders} from './utils';
import {BASE_URI} from '../constants/config';

const PAGED = `${BASE_URI}/v1/calendar-time/group-by-date?service=$1`;
const PAGEDSUB = `${BASE_URI}/v1/calendar-time/group-by-date?subService=$1`;
const PROFF = `${BASE_URI}/v1/calendar-time/group-by-date?professional=$1`;
const PLACE = `${BASE_URI}/v1/calendar-time/group-by-date?place=$1&subService=$2`;

export const requestPaged = async (page = 0, service) => {
  try {
    const response = await fetch(PAGED.replace('$1', service), {
      method: 'GET',
      headers: await authHeaders(),
    });
    await validateResponse(response);
    return await response.json();
  } catch (error) {
    showServerError(error);
  }
};

export const requestPagedSub = async (page = 0, service, telemedicine) => {
  console.log(telemedicine);
  try {
    //
    const response = await fetch(
      `${PAGEDSUB.replace('$1', service)}${
        telemedicine == undefined
          ? ''
          : telemedicine == true
          ? '&telemedicina=true'
          : '&telemedicina=false'
      }`,
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

export const requestPagedProfessional = async (page = 0, professional) => {
  try {
    const response = await fetch(PROFF.replace('$1', professional), {
      method: 'GET',
      headers: await authHeaders(),
    });
    await validateResponse(response);
    return await response.json();
  } catch (error) {
    showServerError(error);
  }
};

export const requestPagedPlace = async (place, service) => {
  try {
    const response = await fetch(
      PLACE.replace('$1', place).replace('$2', service),
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
