import {
	START_FETCH_USER_DATA,
	SET_USER_DATA_ERROR,
	SET_USER_DATA,
	FINISH_FETCH_USER_DATA_FAIL,
	FINISH_FETCH_USER_DATA_SUCCESS,
	SET_ACCESS_TOKEN,
	START_FETCH_NOTIFICATIONS_SOLICITUDES,
	SET_NOTIFICATIONS_SOLICITUDES,
	FINISH_FETCH_NOTIFICATIONS_SOLICITUDES_SUCCESS,
	FINISH_FETCH_NOTIFICATIONS_SOLICITUDES_FAIL,
	ADD_NOTIFICATION_SOLICITUD,
	START_FETCH_MARK_ALL_NOTIFICATIONS_AS_READ,
	FINISH_FETCH_MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS,
	FINISH_FETCH_MARK_ALL_NOTIFICATIONS_AS_READ_FAIL,
	START_FETCH_DELETE_NOTIFICATION,
	DELETE_NOTIFICATION,
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
			solicitudes:{
				start: false,
				finish: false,
				success: false,
				fail: false,
			},
			chat: {
				start: false,
				finish: false,
				success: false,
				fail: false,
			}
		},
		markAllRead:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		}
	},
	notificaciones: {
		solicitudes: [],
		chat: [],
	},
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FINISH_FETCH_MARK_ALL_NOTIFICATIONS_AS_READ_FAIL:
			return{
				...state,
				status:{
					...state.status,
					markAllRead:{
						...state.status.markAllRead,
						start: false,
						finish: true,
						finish: true,
					}
				}
			}
		case FINISH_FETCH_MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS:
			return{
				...state,
				status:{
					...state.status,
					markAllRead:{
						...state.status.markAllRead,
						start: false,
						finish: true,
						success: true,
					}
				}
			}
		case START_FETCH_MARK_ALL_NOTIFICATIONS_AS_READ:
			return{
				...state,
				status:{
					...state.status,
					markAllRead:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		case ADD_NOTIFICATION_SOLICITUD:
			return{
				...state,
				notificaciones:{
					...state.notificaciones,
					solicitudes: [{
						id: action.payload.notification.id,
						type: action.payload.notification.type,
						created_at: Date.now(),
						updated_at: Date.now(),
						read_at: null,
						data:{
							id: -1,
							user_id: action.payload.notification.user_id,
							edificio_id: action.payload.notification.edificio_id,
							solicitud_id: action.payload.notification.solicitud_id,
							status_solicitud: action.payload.notification.status_solicitud,
							body: action.payload.notification.body,
						},
						status: {
							startFetch: false,
						}
					}, ...state.notificaciones.solicitudes]
				}
			}
		case START_FETCH_NOTIFICATIONS_SOLICITUDES:
			return {
				...state,
				status:{
					...state.status,
					notificaciones:{
						...state.notificaciones,
						solicitudes:{
							start: true,
							finish: false,
							success: false,
							fail: false,
						}
					}
				}
			}
		case DELETE_NOTIFICATION:
			return{
				...state,
				notificaciones:{
					...state.notificaciones,
					solicitudes: state.notificaciones.solicitudes.filter(not => not.id !== action.payload.idNotification)
				}
			}
		case START_FETCH_DELETE_NOTIFICATION:
			return {
				...state,
				notificaciones:{
					...state.notificaciones,
					solicitudes: state.notificaciones.solicitudes.map(not => not.id == action.payload.idNotification ?
						{
							...not,
							status:{
								...not.status,
								startFetch: true
							}
						}
						: not)
				}
			}
		case SET_NOTIFICATIONS_SOLICITUDES:
			return {
				...state,
				notificaciones: {
					...state.notificaciones,
					solicitudes: action.payload.notifications.map(not => ({
						...not,
						status:{
							startFetch: false,
						}
					})),
				},
			}
		case FINISH_FETCH_NOTIFICATIONS_SOLICITUDES_SUCCESS:
			return{
				...state,
				status:{
					...state.status,
					notificaciones:{
						...state.status.notificaciones,
						solicitudes:{
							...state.status.notificaciones.solicitudes,
								start: false,
								finish: true,
								success: true,
						}
					}
				}
			}
		case FINISH_FETCH_NOTIFICATIONS_SOLICITUDES_FAIL:
			return{
				...state,
				status:{
					...state.status,
					notificaciones:{
						...state.status.notificaciones,
						solicitudes:{
							...state.status.notificaciones.solicitudes,
							start: false,
							finish: true,
							fail: true,
						}
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

