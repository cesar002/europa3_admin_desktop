import { call, takeLatest, put } from 'redux-saga/effects'

import Europa3Api from '../../api';

import * as gestionUsuariosActions from '../actions/gestionUsuariosActions';

function* fetchUsuariosAdmin(){
	try {
		const resp = yield call(Europa3Api.getUsuariosAdmin)

		console.log(resp)

		if(resp.status !== 'success')
			throw resp.data

		yield put(gestionUsuariosActions.setUsuariosAdmin(resp.data));
		yield put(gestionUsuariosActions.finishFetchUsuariosAdminSuccess());
	} catch (error) {
		yield put(gestionUsuariosActions.finishFetchUsuariosAdminFail())
	}
}

export default function* gestionUsuariosSaga(){
	yield takeLatest(gestionUsuariosActions.START_FETCH_USUARIOS_ADMIN, fetchUsuariosAdmin)
}
