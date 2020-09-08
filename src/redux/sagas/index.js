import { all } from 'redux-saga/effects';

import loginSaga from './loginSaga'
import userSaga from './userDataSaga'

export default function* mainSaga(){
	yield all([
		loginSaga(),
		userSaga(),
	]);
}
