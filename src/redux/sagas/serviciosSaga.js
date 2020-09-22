import { call, put, takeLatest } from 'redux-saga/effects';

import * as serviciosActions from '../actions/serviciosActions';

import Europa3Api from '../../api';


function* fetchServicios(){
	try {
		const resp = yield call(Europa3Api.getServicios);
		if(resp.status !== 'success')
			throw resp.data

		yield put(serviciosActions.setServicios(resp.data))
		yield put(serviciosActions.finishFetchServiciosSuccess())
	} catch (error) {
		yield console.error(error);
		yield put(serviciosActions.finishFetchServiciosFail());
	}
}


export default function* serviciosSaga(){
	yield	takeLatest(serviciosActions.START_FETCH_SERVICIOS, fetchServicios);
}
