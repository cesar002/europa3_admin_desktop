import { call, put, takeLatest, select } from 'redux-saga/effects';
import Europa3Api from '../../api';

import * as userActions from '../actions/userActions'

const token = state => state.userData.accessToken.token;



function* fetchMarkAllNotificationsAsRead(action){
	try {
		const access_token = yield select(token);

		const resp = yield call(Europa3Api.markAllNotificationsAsRead, access_token);
		if(resp.status !== 'success')
			throw resp.error

		yield put(userActions.startFetchNotificationsSolicitudes());
		yield put(userActions.finishFetchMarAllNotificationsAsReadSuccess());
	} catch (error) {
		yield put(userActions.finishFetchMarAllNotificationsAsReadFail());
	}
}

function* userData(action){
	try {
		const access_token = yield select(token);

		const resp = yield call(Europa3Api.getUserData, access_token);
		if(resp.status !== 'success')
			throw resp.error

		yield put(userActions.setUserData(resp.data));
		yield put(userActions.finishFetchUserDataSuccess());
	} catch (error) {
		yield put(userActions.setUserDataError(error));
		yield put(userActions.finishFetchUserDataFail());
	}
}

function* getNotificationsSolicitudes(){
	try {
		const access_token = yield select(token);

		const resp = yield call(Europa3Api.getNotifications, access_token);
		if(resp.status !== 'success')
			throw resp.error

		yield put(userActions.setNotificationsSolicitudes(resp.data));
		yield put(userActions.finishFetchNotificationsSolicitudesSuccess());
	} catch (error) {
		yield put(userActions.finishFetchNotificationsSolicitudesFail());
	}
}

export default function* userDataSaga(){
	yield takeLatest(userActions.START_FETCH_USER_DATA, userData);
	yield takeLatest(userActions.START_FETCH_NOTIFICATIONS_SOLICITUDES, getNotificationsSolicitudes)
	yield takeLatest(userActions.START_FETCH_MARK_ALL_NOTIFICATIONS_AS_READ, fetchMarkAllNotificationsAsRead)
}
