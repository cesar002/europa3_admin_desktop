import { call, takeLatest, put } from 'redux-saga/effects'

import Europa3Api from '../../api';

import * as oficinasVirtualesActions from '../actions/oficinasVirtualesActions';

function* fetchOficinasVirtuales(){
	try {
		const resp = yield call(Europa3Api.getOficinasVirtuales);
		if(resp.status !== 'success')
			throw resp.data;

		yield put(oficinasVirtualesActions.setOficinasVirtuales(resp.data));
		yield put(oficinasVirtualesActions.finishFetchOficinasVirtualesSuccess());
	} catch (error) {
		yield put(oficinasVirtualesActions.finishFetchOficinasVirtualesFail());
	}
}

export default function* oficinasVirtualesSaga(){
	yield takeLatest(oficinasVirtualesActions.START_FETCH_OFICINAS_VIRTUALES, fetchOficinasVirtuales);
}
