import { call, takeLatest, put } from 'redux-saga/effects'

import Europa3Api from '../../api';

import * as oficinaActions from '../actions/oficinasActions';


function* getOficinasByEdificio(action){
	try {
		const resp = yield call(Europa3Api.getOficinasByEdificioId, action.payload.id);

		if(resp.status !== 'success')
			throw resp.data

		yield put(oficinaActions.finishFetchOficinasSuccess())
		yield put(oficinaActions.setOficinas(resp.data))
	} catch (error) {
		yield console.error(error);
		yield put(oficinaActions.finishFetchOficinasFail())
	}
}

function* getOficinas(){
	try {
		const resp = yield call(Europa3Api.getOficinas);

		if(resp.status !== 'success')
			throw resp.data

		yield put(oficinaActions.finishFetchOficinasSuccess())
		yield put(oficinaActions.setOficinas(resp.data))
	} catch (error) {
		yield console.error(error);
		yield put(oficinaActions.finishFetchOficinasFail())
	}
}

function* fetchImagesOficinaToOficinaSelected(action){
	try {
		const resp = yield call(Europa3Api.getOficinaImages, action.payload.id)
		if(resp.status !== 'success')
			throw resp.data

		yield put(oficinaActions.finishFetchImagesOficinaSuccess());
		yield put(oficinaActions.updateImagesOficinaSelected(resp.data))
	} catch (error) {
		yield put(oficinaActions.finishFetchImagesOficinaFail());
	}
}


export default function* oficinaSaga(){
	yield takeLatest(oficinaActions.START_FETCH_OFICINAS, getOficinas)
	yield takeLatest(oficinaActions.START_FETCH_OFICINAS_BY_EDIFICIO_ID, getOficinasByEdificio)
	yield takeLatest(oficinaActions.START_FETCH_IMAGES_OFICINA, fetchImagesOficinaToOficinaSelected)
}
