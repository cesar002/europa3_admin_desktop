import { takeLatest, put } from 'redux-saga/effects'

import * as initLoadAction from '../actions/initLoadActions';

import * as loginActions from '../actions/loginActions';
import * as locationsActions from '../actions/locationActions';
import * as configActions from '../actions/configAction';
import * as mobiliarioActions from '../actions/mobiliarioActions';
import * as edificiosActions from '../actions/edificioAction';
import * as serviciosActions from '../actions/serviciosActions';
import * as idiomasAtencionActions from '../actions/idiomasAtencionActions';
import * as salaJuntasActions from '../actions/salaJuntasActions';

function* initAll(){
	yield put( initLoadAction.startFetchSystemData() );
	yield put( initLoadAction.startAutoLogin() );
}

function* fetchSystemData(){
	yield put( configActions.startFetchOficinasSizes() );
	yield	put( locationsActions.startFetchEstados() );
	yield put( salaJuntasActions.startFetchSalaJuntas() );
	yield put( mobiliarioActions.startFetchTipoMobiliario() );
	yield put( mobiliarioActions.startFetchMobiliario() );
	yield put( edificiosActions.startFetchEdificios() );
	yield put( serviciosActions.startFetchServicios() );
	yield put( idiomasAtencionActions.startFetchIdiomasAtencion() );
}

function* autoLogin(){
	yield put( loginActions.startAutoLogin() );
}


export default function* initLoadSaga(){
	yield takeLatest(initLoadAction.START_INIT_ALL, initAll);
	yield takeLatest(initLoadAction.START_FETCH_SYSTEM_DATA, fetchSystemData);
	yield takeLatest(initLoadAction.START_INIT_AUTO_LOGIN, autoLogin);
}
