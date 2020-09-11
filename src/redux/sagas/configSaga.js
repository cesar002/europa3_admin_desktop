import { call, takeLatest, put } from 'redux-saga/effects';

import * as configActions from '../actions/configAction';
import Europa3 from '../../api';


function* getOficinasSizes(){
	try {
		const resp = yield call(Europa3.getSizesOficinas);

		if(resp.status !== 'success')
			throw resp.data

		yield put(configActions.setOficinasSizes(resp.data));
		yield put(configActions.finishFetchOficinaSizesSuccess())
	} catch (error) {
		yield put(configActions.finishFetchOficinaSizesFail())
	}
}

export default function* configSaga(){
	yield takeLatest(configActions.START_FETCH_OFICINA_SIZES, getOficinasSizes);
}
