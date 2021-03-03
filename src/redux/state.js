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
import oficinasVirtualesReducer from './reducers/oficinasVirtualesReducer';
import chatReducer from './reducers/chatReducer';
import adicionalesReducer from './reducers/adicionalesReducer';
import gestionUsuariosReduce from './reducers/gestionUsuariosReducer';

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
	oficinasVirtualesData: oficinasVirtualesReducer,
	chatsData: chatReducer,
	adicionalesData: adicionalesReducer,
	gestionUsuariosData: gestionUsuariosReduce,
})

export default state;
