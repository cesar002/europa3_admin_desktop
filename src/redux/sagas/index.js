import { all } from 'redux-saga/effects';

import loginSaga from './loginSaga';
import userSaga from './userDataSaga';
import edificioSaga from './edificioSaga';
import locationsSaga from './locationSaga';
import oficinaSaga from './oficinasSaga';
import configSaga from './configSaga';
import mobiliarioSaga from './mobiliarioSaga';
import serviciosSaga from './serviciosSaga';
import idiomasAtencionSaga from './idiomasAtencionSaga';
import initLoadSaga from './initLoadSaga';
import salaJuntasSaga from './salaJuntasSaga';

export default function* mainSaga(){
	yield all([
		loginSaga(),
		userSaga(),
		edificioSaga(),
		locationsSaga(),
		oficinaSaga(),
		configSaga(),
		mobiliarioSaga(),
		serviciosSaga(),
		initLoadSaga(),
		idiomasAtencionSaga(),
		salaJuntasSaga(),
	]);
}
