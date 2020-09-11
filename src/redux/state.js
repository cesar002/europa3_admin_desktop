import { combineReducers } from 'redux'

import loginReducer from './reducers/loginReducer';
import userReducer from './reducers/userReducer';
import edificiosReducer from './reducers/edificiosReducer';
import locationReducer from './reducers/locationReducer';
import oficinasReducer from './reducers/oficinasReducer';
import configReducer from './reducers/configReducer';

const state = combineReducers({
	userData: userReducer,
	loginData: loginReducer,
	edificiosData: edificiosReducer,
	locationsData: locationReducer,
	oficinasData: oficinasReducer,
	configData: configReducer,
})

export default state;
