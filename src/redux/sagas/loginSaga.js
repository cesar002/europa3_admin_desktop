import { call, put, takeLatest } from 'redux-saga/effects';
import Europa3Api from '../../api';
import * as loginActions from '../actions/loginActions';
import { setAccessToken } from '../actions/userActions'

function* login(action){
	try {
		const resp = yield call(Europa3Api.login, action.payload.username, action.payload.password)

		if(resp.success !== 'success')
			throw resp.data

		yield put(setAccessToken(resp.data.access_token))

		yield put(loginActions.finishFetchLoginSuccess())
	} catch (error) {
		yield put(loginActions.finishFetchLoginFail())
		yield put(loginActions.setErrorLogin(error.error))
	}
}

export default function* loginSaga(){
	yield takeLatest(loginActions.START_FETCH_LOGIN, login);
}
