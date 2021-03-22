import { Alert } from "react-native";
import moment from 'moment';

export const validarCpf = strCPF => {
    let Soma;
    let Resto;
    Soma = 0;

    if (strCPF === '00000000000' || strCPF.length !== 11) {
        Alert.alert('ClinicLabs', 'CPF inválido');
        return false;
    }

    for (let i = 1; i <= 9; i += 1) Soma += parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto == 11) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(9, 10), 10)) {
        Alert.alert('ClinicLabs', 'CPF inválido');
        return false;
    }

    Soma = 0;
    for (let i = 1; i <= 10; i += 1) Soma += parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(10, 11), 10)) {
        Alert.alert('ClinicLabs', 'CPF inválido');
        return false;
    }

    return true;
};

export const validarEmail = email => {
    if (email.length === 0) {
        Alert.alert('ClinicLabs', 'Email é uma informação obrigatória');
        return false;
    }
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(email)) {
        Alert.alert('ClinicLabs', 'Email inválido');
        return false;
    }

    return true;
};

export const validarData = (valor, formato) => {
    let value = moment(valor, formato);
    return value.isValid() && value.year() >= 1900;
};
