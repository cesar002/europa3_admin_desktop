import {
	START_FETCH_USER_DATA,
	SET_USER_DATA_ERROR,
	SET_USER_DATA,
	FINISH_FETCH_USER_DATA_FAIL,
	FINISH_FETCH_USER_DATA_SUCCESS,
	SET_ACCESS_TOKEN,
	START_FETCH_NOTIFICATIONS,
	SET_NOTIFICATIONS,
	FINISH_FETCH_NOTIFICATIONS_SUCCESS,
	FINISH_FETCH_NOTIFICATIONS_FAIL,
} from '../actions/userActions';

const initialState = {
	userData: {},
	accessToken: {},
	status: {
		start: false,
		finish: false,
		success: false,
		fail: false,
		notificaciones:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		}
	},
	notificaciones: [],
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case START_FETCH_NOTIFICATIONS:
			return {
				...state,
				status:{
					...state.status,
					notificaciones:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		case SET_NOTIFICATIONS:
			return {
				...state,
				notificaciones: action.payload.notifications,
			}
		case FINISH_FETCH_NOTIFICATIONS_SUCCESS:
			return{
				...state,
				status:{
					...state.status,
					notificaciones:{
						...state.status.notificaciones,
						start: false,
						finish: true,
						success: true,
					}
				}
			}
		case FINISH_FETCH_NOTIFICATIONS_FAIL:
			return{
				...state,
				status:{
					...state.status,
					notificaciones:{
						...state.status.notificaciones,
						start: false,
						finish: true,
						fail: true,
					}
				}
			}
		case START_FETCH_USER_DATA:
			return {
				...state,
				status:{
					...state.status,
					start: true,
					finish: false,
					success: false,
					fail: false,
				}
			}
		case SET_USER_DATA:
			return {
				...state,
				userData: action.payload.data,
			}
		case SET_USER_DATA_ERROR:
			return {
				...state,
				error: action.payload.error,
			}
		case FINISH_FETCH_USER_DATA_SUCCESS:
			return{
				...state,
				status:{
					...state.status,
					start: false,
					finish: true,
					success: true,
				}
			}
		case FINISH_FETCH_USER_DATA_FAIL:
			return{
				...state,
				status:{
					...state.status,
					start: false,
					finish: true,
					fail: true,
				}
			}
		case SET_ACCESS_TOKEN:
			return{
				...state,
				accessToken:{
					token: action.payload.token.access_token,
					refresh: action.payload.token.refresh_token,
				},
			}
		default:
			return state;
	}
}

