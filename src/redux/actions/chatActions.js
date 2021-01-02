export const START_FETCH_SOLICITUDES_CHAT = 'START_FETCH_SOLICITUDES_CHAT';
export const FINISH_FETCH_SOLICITUDES_CHAT_SUCCESS = 'FINISH_FETCH_SOLICITUDES_CHAT_SUCCESS';
export const FINISH_FETCH_SOLICITUDES_CHAT_FAIL = 'FINISH_FETCH_SOLICITUDES_CHAT_FAIL';
export const SET_SOLICITUDES_CHATS = 'SET_SOLICITUDES_CHATS';

export const SELECT_CHAT = 'SELECT_CHAT';
export const RECEIVING_MESSAGE_CHAT = 'RECEIVING_MESSAGE_CHAT';
export const CLEAR_SELECTED_CHAT = 'CLEAR_SELECTED_CHAT';
export const SEND_MESSAGE_CHAT = 'SEND_MESSAGE_CHAT';
export const SEND_MESSAGE_CHAT_SUCCESS = 'SEND_MESSAGE_CHAT_SUCCESS';
export const SEND_MESSAGE_CHAT_FAIL = 'SEND_MESSAGE_CHAT_FAIL';
export const ADD_SENT_MESSAGE_CHAT = 'ADD_SENT_MESSAGE_CHAT'


export const addSentMessageChat = message => ({
	type: ADD_SENT_MESSAGE_CHAT,
	payload: { message }
})

export const sendMessageChatSuccess = () => ({
	type: SEND_MESSAGE_CHAT_SUCCESS,
})

export const sendMessageChatFail = () => ({
	type: SEND_MESSAGE_CHAT_FAIL,
})

export const sendMessageChat = (mensaje, edificio_id, solicitud_id) => ({
	type: SEND_MESSAGE_CHAT,
	payload: { mensaje, edificio_id, solicitud_id }
})

export const selectChat = solicitudId => ({
	type: SELECT_CHAT,
	payload: { solicitudId }
})

export const receivingMessageChat = message => ({
	type: RECEIVING_MESSAGE_CHAT,
	payload: { message}
})

export const clearSelectedChat = () => ({
	type: CLEAR_SELECTED_CHAT,
})

export const startFetchSolicitudesChat = () => ({
	type: START_FETCH_SOLICITUDES_CHAT,
})

export const finishFetchSolicitudesChatSuccess = () => ({
	type: FINISH_FETCH_SOLICITUDES_CHAT_SUCCESS,
})

export const finishFetchSolicitudesChatFail = () => ({
	type: FINISH_FETCH_SOLICITUDES_CHAT_FAIL,
})

export const setSolicitudesChats = chats => ({
	type: SET_SOLICITUDES_CHATS,
	payload: { chats }
})
