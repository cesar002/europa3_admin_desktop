import { all } from 'redux-saga/effects';

import loginSaga from './loginSaga'

export default function* mainSaga(){
	yield all([
		loginSaga(),
	]);
}
