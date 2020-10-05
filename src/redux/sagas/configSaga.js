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

function* getCatTiempoRenta(){
	try {
		const resp = yield call(Europa3.getCatTiemposRenta);

		if(resp.status !== 'success')
			throw resp.data

		yield put(configActions.setCatTiemposRenta(resp.data))
		yield put(configActions.finishFetchCatTiempoRentaSuccess())
	} catch (error) {
		yield put(configActions.finishFetchCatTiempoRentaFail());
	}
}

export default function* configSaga(){
	yield takeLatest(configActions.START_FETCH_OFICINA_SIZES, getOficinasSizes);
	yield takeLatest(configActions.START_FETCH_CAT_TIEMPOS_RENTA, getCatTiempoRenta);
}
