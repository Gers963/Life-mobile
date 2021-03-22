import {combineReducers} from 'redux';
import professional from './professional';
import payment from './payment';
import attendance from './attendance';
import exam from './exam';
import appointment from './appointment';
import serviceType from './service-type';
import service from './service';
import calendar from './calendar';
import accountWallet from './account-wallet';
import scheduling from './scheduling';
import place from './place';
import medicament from './medicament';
import disease from './disease';
import patient from './patient';
import pet from './pet';

export default combineReducers({
  professional,
  payment,
  attendance,
  exam,
  patient,
  appointment,
  serviceType,
  service,
  calendar,
  accountWallet,
  scheduling,
  place,
  medicament,
  disease,
  pet
});
