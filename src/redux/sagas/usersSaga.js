import { put, takeLatest, call, select } from 'redux-saga/effects';
import Europa3Api from '../../api';

import * as usersActions from '../actions/usersAction';

const token = state => state.userData.accessToken.token;

function* fetchUsuarios(){
	try {
		const access_token = yield select(token);

		const resp = yield call(Europa3Api.getUsuarios, access_token)
		if(resp.status !== 'success')
			throw resp.data;

		yield put(usersActions.setUsers(resp.data));
		yield put(usersActions.finishFetchUsersSuccess());
	} catch (error) {
		yield console.log('usersData-saga', error)
		yield put(usersActions.finishFetchUsersFail());
	}
}

export default function* usersSaga(){
	yield takeLatest(usersActions.START_FETCH_USERS, fetchUsuarios)
}
