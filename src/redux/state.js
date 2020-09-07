import { combineReducers } from 'redux'

import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'

const state = combineReducers({
	userData: userReducer,
	loginData: loginReducer,
})

export default state;
