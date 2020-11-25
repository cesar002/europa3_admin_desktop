import { takeLatest, put, call, select } from 'redux-saga/effects';

import Europa3Api from '../../api';

import * as solicitudesAction from '../actions/solicitudesAction';

const token = state => state.userData.accessToken.token;

function* fetchSolicitudes(){
	try {
		const access_token = yield select(token);

		const resp = yield call(Europa3Api.getSolicitudes, access_token);
		if(resp.status !== 'success')
			throw resp.data

		yield put(solicitudesAction.setSolicitudes(resp.data));
		yield put(solicitudesAction.finishFetchSolicitudesSuccess());
	} catch (error) {
		yield put(solicitudesAction.finishFetchSolicitudesFail());
	}
}

function* fetchSolicitudById(action){
	try {
		const access_token = yield select(token);

		const resp = yield call(Europa3Api.getSolicitudById, action.payload.id, access_token)
		if(resp.status !== 'success')
			throw resp.data

		yield put(solicitudesAction.setSolicitudOficina(resp.data));
		yield put(solicitudesAction.finishFetchSolicitudOficinaByIdSuccess());
	} catch (error) {
		yield put(solicitudesAction.finishFetchSolicitudOficinaByIdFail());
	}
}

export default function* solicitudesSaga(){
	yield takeLatest(solicitudesAction.START_FETCH_SOLICITUDES, fetchSolicitudes);
	yield takeLatest(solicitudesAction.START_FETCH_SOLICITUD_OFICINA_BY_ID, fetchSolicitudById);
}
