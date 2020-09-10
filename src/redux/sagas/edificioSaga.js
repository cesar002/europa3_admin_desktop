import { call, takeLatest, put } from 'redux-saga/effects'

import * as edificioActions from '../actions/edificioAction'
import Europa3Api from '../../api';

function* getEdificios(){
	try {
		const resp = yield call(Europa3Api.getEdificios);

		if(resp.status !== 'success')
			throw resp.data

		yield put(edificioActions.setEdificios(resp.data));
		yield put(edificioActions.finishFetchEdificiosSuccess());
	} catch (error) {
		yield put(edificioActions.setFetchEdificiosError(error));
		yield put(edificioActions.finishFetchEdificiosFail());
	}
}

function* registerEdificio(action){
	try {
		const resp = yield call(Europa3Api.registerEdificio, action.payload.data);

		if(resp.status !== 'success')
			throw resp.data;

		yield put(edificioActions.finishFetchRegisterEdificioSuccess());
		yield put(edificioActions.startFetchEdificios());
	} catch (error) {
		yield put(edificioActions.finishFetchRegisterEdificioFail());
		yield put(edificioActions.setRegisterEdificioError(error));
	}
}

export default function* edificioSaga(){
	yield takeLatest(edificioActions.START_FETCH_EDIFICIOS, getEdificios)
	yield takeLatest(edificioActions.START_FETCH_REGISTER_EDIFICIO, registerEdificio)
}
