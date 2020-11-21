import { combineReducers } from 'redux'

import loginReducer from './reducers/loginReducer';
import userReducer from './reducers/userReducer';
import edificiosReducer from './reducers/edificiosReducer';
import locationReducer from './reducers/locationReducer';
import oficinasReducer from './reducers/oficinasReducer';
import configReducer from './reducers/configReducer';
import mobiliarioReducer from './reducers/mobiliarioReducer';
import serviciosReducer from './reducers/serviciosReducer';
import idiomasAtencionReducer from './reducers/idiomasAtencionReducer';
import salaJuntasReducer from './reducers/salaJuntasReducer';
import usersReducer from './reducers/usersReducer';
import solicitudesReducer from './reducers/solicitudesReducer';

const state = combineReducers({
	userData: userReducer,
	loginData: loginReducer,
	edificiosData: edificiosReducer,
	locationsData: locationReducer,
	oficinasData: oficinasReducer,
	configData: configReducer,
	mobiliarioData: mobiliarioReducer,
	serviciosData: serviciosReducer,
	idiomasAtencionData: idiomasAtencionReducer,
	salaJuntasData: salaJuntasReducer,
	usersData: usersReducer,
	solicitudesData: solicitudesReducer,
})

export default state;
