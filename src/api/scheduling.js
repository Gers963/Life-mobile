import { validateResponse, showServerError, authHeaders } from './utils'
import { BASE_URI, BASE_WAPI } from '../constants/config'
import AsyncStorage from "@react-native-community/async-storage";
import moment from 'moment'

const SKIPPED = `${BASE_URI}/v1/scheduling?skip=$1&patient=$2`
const CREATE = `${BASE_URI}/v1/scheduling/create`
const CURRENT = `${BASE_URI}/v1/scheduling/$1`
const WAPI = `${BASE_WAPI}/chat/sendmessage/`

export const requestSkipped = async (skip = 0) => {
    const id = await AsyncStorage.getItem('@coft:patientId')
    try {
        const response = await fetch(SKIPPED.replace('$1', skip).replace('$2', id), {
            method: 'GET',
            headers: await authHeaders()
        });
        await validateResponse(response);
        return await response.json();
    } catch (error) {
        showServerError(error);
    }
}

export const sendConfirmationMsg = async (phone, calendar) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer QVRZwYgGAml+s25ZS0sHOuxRF5qof34kkMMiScFAUqg=");
        myHeaders.append("Content-Type", "application/json");

        const response = await fetch(WAPI + phone, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                message: `Agendamneto realizado com sucesso!\n\n🏥 *Local de atendimento*:\n${calendar.calendar.place.fullName}\n👨🏻‍⚕️ *Profissional*:\n${calendar.calendar.professional.fullName}\n⏰ *Horário*:\n${moment(calendar.date).format('DD/MM/YYYY HH:mm')}\n💊 *Serviço*:\n${calendar.calendar.service != null ? calendar.calendar.service.name : calendar.calendar.subService.name}`
            })
        });
        await validateResponse(response);
        return await response.json();
    } catch (error) {
        showServerError(error);
    }
}

export const current = async (id) => {
    try {
        const response = await fetch(CURRENT.replace('$1', id), {
            method: 'GET',
            headers: await authHeaders()
        });
        await validateResponse(response);
        return await response.json();
    } catch (error) {
        showServerError(error);
    }
}

export const create = async (scheduling) => {
    const response = await fetch(CREATE, {
        method: 'POST',
        headers: await authHeaders(),
        body: JSON.stringify({ ...scheduling, patient: await AsyncStorage.getItem('@coft:patientId')})
    });

    await validateResponse(response);
    return await response;
}

export const update = async (shed) => {
    const patient = {
        patient: await AsyncStorage.getItem('@coft:patientId'),
    }
    const response = await fetch(CURRENT.replace('$1', shed.id), {
        method: 'PUT',
        headers: await authHeaders(),
        body: JSON.stringify(patient)
    });

    await validateResponse(response);
    return await response;
}