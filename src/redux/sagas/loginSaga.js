import { call, put, takeLatest } from 'redux-saga/effects';

import Europa3Api from '../../api';
import * as loginActions from '../actions/loginActions';
import {
	setAccessToken, startFetchUserData, startFetchNotificationsSolicitudes
} from '../actions/userActions'
import localStorageService from '../../services/UserCredencialsStorageService'

function* login(action){
	try {
		const resp = yield call(Europa3Api.login, action.payload.username, action.payload.password)

		if(resp.status !== 'success')
			throw resp.data

		yield put(setAccessToken(resp.data));

		yield put(loginActions.finishFetchLoginSuccess());
		yield put(startFetchUserData());
		yield put(startFetchNotificationsSolicitudes());
	} catch (error) {
		yield put(loginActions.finishFetchLoginFail());
		yield put(loginActions.setErrorLogin(error.error));
	}
}

function* autoLogin(){
	try {

		if( localStorageService.tokenIsExpired() ){
			//refresh
		}

		const data = yield localStorageService.getCredentials();

		yield put(setAccessToken({
			access_token: data.access_token,
			refresh_token: data.refresh_token,
		}));
		yield put(startFetchUserData());
		yield put(startFetchNotificationsSolicitudes());
	} catch (error) {

	}
}

export default function* loginSaga(){
	yield takeLatest(loginActions.START_FETCH_LOGIN, login);
	yield takeLatest(loginActions.START_AUTO_LOGIN, autoLogin);
}
