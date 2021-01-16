import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';

import Europa3Api from '../../api';

import * as adicionalesActions from '../actions/adicionalesActions'

function* fetchAdicionales(){
	try {
		const resp = yield call(Europa3Api.getAdicionales)
		if(resp.status !== 'success'){
			throw resp.data
		}

		yield put(adicionalesActions.setAdicionales(resp.data))
		yield put(adicionalesActions.finishFetchAdicionalesSuccess())
	} catch (error) {
		yield put(adicionalesActions.finishFetchAdicionalesFail())
	}
}

function* fetchCatUnidades(){
	try {
		const resp = yield call(Europa3Api.getCatUnidades)
		if(resp.status !== 'success'){
			throw resp.data
		}

		yield put(adicionalesActions.setCatUnidadesAdicionales(resp.data))
		yield put(adicionalesActions.finishFetchCatUnidadesAdicionalesSuccess())
	} catch (error) {
		yield put(adicionalesActions.finishFetchCatUnidadesAdicionalesFail())
	}
}

export default function* adicionalesSaga(){
	yield takeLatest(adicionalesActions.START_FETCH_ADICIONALES, fetchAdicionales);
	yield takeLatest(adicionalesActions.START_FETCH_CAT_UNIDADES_ADICIONALES, fetchCatUnidades)
}
