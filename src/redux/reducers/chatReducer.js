import {
	START_FETCH_SOLICITUDES_CHAT,
	FINISH_FETCH_SOLICITUDES_CHAT_SUCCESS,
	FINISH_FETCH_SOLICITUDES_CHAT_FAIL,
	SET_SOLICITUDES_CHATS,
	SELECT_CHAT,
	RECEIVING_MESSAGE_CHAT,
	ADD_SENT_MESSAGE_CHAT,
	CLEAR_SELECTED_CHAT,
	SEND_MESSAGE_CHAT_SUCCESS,
	SEND_MESSAGE_CHAT,
	SEND_MESSAGE_CHAT_FAIL,
} from '../actions/chatActions';

const initialState = {
	status:{
		chats:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
		sendMessageChat: {
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
	},
	chats: [],
	chatsCopy: [],
	chatSelectedId: null,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_SENT_MESSAGE_CHAT:
			return {
				...state,
				chats: state.chats.map(c => c.id !== action.payload.message.solicitud_id ? c :
					{...c,
						chats: [...c.chats, action.payload.message]
					}),
			}
		case SEND_MESSAGE_CHAT_FAIL:
			return {
				...state,
				status:{
					...state.status,
					sendMessageChat:{
						...state.status.sendMessageChat,
						start: false,
						finish: true,
						fail: true,
					}
				}
			}
		case SEND_MESSAGE_CHAT_SUCCESS:
			return {
				...state,
				status:{
					...state.status,
					sendMessageChat:{
						...state.status.sendMessageChat,
						start: false,
						finish: true,
						success: true,
					}
				}
			}
		case SEND_MESSAGE_CHAT:
			return {
				...state,
				status:{
					...state.status,
					sendMessageChat:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		case CLEAR_SELECTED_CHAT:
			return {
				...state,
				chatSelectedId: null,
			}
		case RECEIVING_MESSAGE_CHAT:
			let chat = state.chats.find(c => c.id == action.payload.message.solicitud_id)
			let exist = chat.chats.find(c => c._id == action.payload.message._id)

			if(exist){
				return state;
			}

			return {
				...state,
				chats: state.chats.map(c => c.id !== action.payload.message.solicitud_id ? c :
						{...c,
							chats: [...c.chats, action.payload.message]
						}),
			}
		case SELECT_CHAT:
			return {
				...state,
				chatSelectedId: action.payload.solicitudId
			}
		case START_FETCH_SOLICITUDES_CHAT:
			return {
				...state,
				status:{
					...state.status,
					chats:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		case FINISH_FETCH_SOLICITUDES_CHAT_SUCCESS:
			return {
				...state,
				status:{
					...state.status,
					chats:{
						...state.status.chats,
						start: false,
						finish: true,
						success: true,
					}
				}
			}
		case FINISH_FETCH_SOLICITUDES_CHAT_FAIL:
			return {
				...state,
				status:{
					...state.status,
					chats:{
						...state.status.chats,
						start: false,
						finish: true,
						fail: true,
					}
				}
			}
		case SET_SOLICITUDES_CHATS:
			return{
				...state,
				chats: action.payload.chats,
				chatsCopy: action.payload.chats,
			}
		default:
			return state;
	}
}
