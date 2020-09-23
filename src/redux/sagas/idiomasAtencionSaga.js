import { call, takeLatest, put } from 'redux-saga/effects';

import * as idiomasAtencionActions from '../actions/idiomasAtencionActions';

import Europa3Api from '../../api';

function* fetchIdiomasAtencion(){
	try {
		const resp = yield call(Europa3Api.getIdiomasAtencion)

		if(resp.status !== 'success')
			throw resp.data;

		yield put(idiomasAtencionActions.setIdiomasAtencion(resp.data));
		yield put(idiomasAtencionActions.finishFetchIdiomasAtencionSuccess());
	} catch (error) {
		yield console.log(error);
		yield put(idiomasAtencionActions.finishFetchIdiomasAtencionFail);
	}
}

export default function* idiomasAtencionSaga(){
	yield takeLatest(idiomasAtencionActions.START_FETCH_IDIOMAS_ATENCION, fetchIdiomasAtencion)
}
