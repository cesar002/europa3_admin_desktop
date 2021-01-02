import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';

import * as chatActions from '../actions/chatActions';

import Europa3api from '../../api';



function* fetchChats(){
	try {
		const resp = yield call(Europa3api.getChats)
		if(resp.status !== 'success')
			resp.data;

		yield put(chatActions.setSolicitudesChats(resp.data));
		yield put(chatActions.finishFetchSolicitudesChatSuccess());
	} catch (error) {
		yield put(chatActions.finishFetchSolicitudesChatFail())
	}
}

function* sendMessage(action){
	try {
		const resp = yield call(Europa3api.sendMessageChat, action.payload)
		if(resp.status !== 'success')
			throw resp.data

		yield put(chatActions.sendMessageChatSuccess());
	} catch (error) {
		yield put(chatActions.sendMessageChatFail());
	}
}


export default function* chatSaga(){
	yield takeLatest(chatActions.START_FETCH_SOLICITUDES_CHAT, fetchChats)
	yield takeEvery(chatActions.SEND_MESSAGE_CHAT, sendMessage)
}
