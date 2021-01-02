import { takeLatest, put, call, select } from 'redux-saga/effects';

import Europa3Api from '../../api';

import * as solicitudesAction from '../actions/solicitudesAction';

const token = state => state.userData.accessToken.token;

function* noAutorizarSolicitud(action){
	try {
		const access_token = yield select(token);

		const resp = yield call(Europa3Api.noAutorizarSolicitud, action.payload.id, access_token);
		if(resp.status !== 'success')
			throw resp.data;

		yield put(solicitudesAction.finishFetchSolicitudNoAutorizarSuccess());
		yield put(solicitudesAction.markSolicitudToNoAutorizado());
	} catch (error) {
		yield put(solicitudesAction.finishFetchSolicitudNoAutorizarFail());
	}
}

function* autorizarSolicitud(action){
	try {
		const access_token = yield select(token);

		const resp = yield call(Europa3Api.autorizarSolicitud, action.payload.id, access_token)
		if(resp.status !== 'success')
			throw resp.data

		yield put(solicitudesAction.finishFetchSolicitudAutorizarSuccess());
		yield put(solicitudesAction.markSolicitudToAutorizado());
	} catch (error) {
		yield put(solicitudesAction.finishFetchSolicitudAutorizarFail());
	}
}

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

		console.log(resp.data);
		yield put(solicitudesAction.setSolicitudOficina(resp.data));
		yield put(solicitudesAction.finishFetchSolicitudOficinaByIdSuccess());
	} catch (error) {
		yield put(solicitudesAction.finishFetchSolicitudOficinaByIdFail());
	}
}

export default function* solicitudesSaga(){
	yield takeLatest(solicitudesAction.START_FETCH_SOLICITUDES, fetchSolicitudes);
	yield takeLatest(solicitudesAction.START_FETCH_SOLICITUD_OFICINA_BY_ID, fetchSolicitudById);
	yield takeLatest(solicitudesAction.START_FETCH_SOLICITUD_AUTORIZAR, autorizarSolicitud);
	yield takeLatest(solicitudesAction.START_FETCH_SOLICITUD_NO_AUTORIZAR, noAutorizarSolicitud)
}
