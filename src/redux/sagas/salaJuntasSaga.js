import { call, takeLatest, put } from 'redux-saga/effects'

import Europa3Api from '../../api';

import * as salaJuntasActions from '../actions/salaJuntasActions';


function* fetchSalaJuntas(){
	try {
		const resp = yield call(Europa3Api.getSalasJuntas)

		if(resp.status !== 'success'){
			throw resp.data
		}

		yield put(salaJuntasActions.setSalaJuntas(resp.data))
		yield put(salaJuntasActions.finishFetchSalaJuntasSuccess());
	} catch (error) {
		yield console.error('fetchSalaJuntas', error);
		yield put(salaJuntasActions.finishFetchSalaJuntasFail());
	}
}

export default function* salaJuntasSaga(){
	yield takeLatest(salaJuntasActions.START_FETCH_SALA_JUNTAS, fetchSalaJuntas);
}
