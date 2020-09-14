import { all } from 'redux-saga/effects';

import loginSaga from './loginSaga';
import userSaga from './userDataSaga';
import edificioSaga from './edificioSaga';
import locationsSaga from './locationSaga';
import oficinaSaga from './oficinasSaga';
import configSaga from './configSaga';

export default function* mainSaga(){
	yield all([
		loginSaga(),
		userSaga(),
		edificioSaga(),
		locationsSaga(),
		oficinaSaga(),
		configSaga(),
	]);
}