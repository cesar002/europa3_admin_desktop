import { call, takeLatest, put } from 'redux-saga/effects'

import * as locationActions from '../actions/locationActions'
import Europa3Api from '../../api';

function* getEstados(){
	try {
		const resp = yield call(Europa3Api.getEstados)

		if(resp.status !== 'success')
			throw resp.error

		yield put(locationActions.setEstados(resp.data))
		yield put(locationActions.finishFetchEstadosSuccess())
	} catch (error) {
		yield put(locationActions.finishFetchEstadosFail())
	}
}

function* getMunicipios(action){
	try {
		const resp = yield call(Europa3Api.getMunicipiosByEstadoId, action.payload.id)

		if(resp.status !== 'success')
			throw resp.error

		yield put(locationActions.finishFetchMunicipiosSuccess())
		yield put(locationActions.setMunicipios(resp.data))
	} catch (error) {
		yield put(locationActions.finishFetchMunicipiosFail())
	}
}

export default function* locationSaga(){
	yield takeLatest(locationActions.START_FETCH_MUNICIPIOS, getMunicipios);
	yield takeLatest(locationActions.START_FETCH_ESTADOS, getEstados);
}
