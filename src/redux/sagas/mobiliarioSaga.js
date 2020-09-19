import { call, put, takeLatest } from 'redux-saga/effects';

import * as mobiliarioActions from '../actions/mobiliarioActions';

import Europa3Api from '../../api';


function* getMobiliario(){
	try {
		const resp = yield call(Europa3Api.getMobiliario);

		if(resp.status !== 'success')
			throw resp.error

		yield put(mobiliarioActions.setMobiliario(resp.data));
		yield put(mobiliarioActions.finishFetchMobiliarioSuccess());
	} catch (error) {
		yield console.log(error)
		yield put(mobiliarioActions.finishFetchMobiliarioFail());
	}
}

function* getTipoMobiliario(){
	try {
		const resp = yield call(Europa3Api.getTipoMobiliario)
		if(resp.status !== 'success')
			throw resp.error

		yield put(mobiliarioActions.setTipoMobiliario(resp.data));
		yield put(mobiliarioActions.finishFetchTipoMobiliarioSuccess())
	} catch (error) {
		yield put(mobiliarioActions.finishFetchTipoMobiliarioFail())
	}
}

function* getMobiliarioByEdificioId(action){
	try {
		const resp = yield call(Europa3Api.getMobiliarioByEdificio, action.payload.edificioId)
		if(resp.status !== 'success')
			throw resp.error

		yield put(mobiliarioActions.setMobiliarioByEdificio(resp.data));
		yield put(mobiliarioActions.finishFetchMobiliarioByEdificioIdSuccess());
	} catch (error) {
		yield console.error('getMobiliarioByEdificioId - mobiliarioSaga', error.data);
		yield put(mobiliarioActions.finishFetchMobiliarioByEdificioIdFail());
	}
}


export default function* mobiliarioSaga(){
	yield takeLatest(mobiliarioActions.START_FETCH_MOBILIARIO, getMobiliario);
	yield takeLatest(mobiliarioActions.START_FETCH_TIPO_MOBILIARIO, getTipoMobiliario);
	yield takeLatest(mobiliarioActions.START_FETCH_MOBILIARIO_BY_EDIFICIO_ID, getMobiliarioByEdificioId)
}
