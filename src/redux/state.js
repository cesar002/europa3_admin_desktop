import { combineReducers } from 'redux'

import loginReducer from './reducers/loginReducer';
import userReducer from './reducers/userReducer';
import edificiosReducer from './reducers/edificiosReducer';
import locationReducer from './reducers/locationReducer';
import oficinasReducer from './reducers/oficinasReducer';
import configReducer from './reducers/configReducer';
import mobiliarioReducer from './reducers/mobiliarioReducer';

const state = combineReducers({
	userData: userReducer,
	loginData: loginReducer,
	edificiosData: edificiosReducer,
	locationsData: locationReducer,
	oficinasData: oficinasReducer,
	configData: configReducer,
	mobiliarioData: mobiliarioReducer,
})

export default state;
