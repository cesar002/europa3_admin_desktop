export const START_FETCH_USER_DATA = 'START_FETCH_USER_DATA';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USER_DATA_ERROR = 'SET_USER_DATA_ERROR';
export const FINISH_FETCH_USER_DATA_SUCCESS = 'FINISH_FETCH_USER_DATA_SUCCESS';
export const FINISH_FETCH_USER_DATA_FAIL = 'FINISH_FETCH_USER_DATA_FAIL';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export const START_FETCH_NOTIFICATIONS_SOLICITUDES = 'START_FETCH_NOTIFICATIONS_SOLICITUDES';
export const SET_NOTIFICATIONS_SOLICITUDES = 'SET_NOTIFICATIONS_SOLICITUDES';
export const FINISH_FETCH_NOTIFICATIONS_SOLICITUDES_SUCCESS = 'FINISH_FETCH_NOTIFICATIONS_SOLICITUDES_SUCCESS';
export const FINISH_FETCH_NOTIFICATIONS_SOLICITUDES_FAIL = 'FINISH_FETCH_NOTIFICATIONS_SOLICITUDES_FAIL';

export const ADD_NOTIFICATION_SOLICITUD = 'ADD_NOTIFICATION_SOLICITUD';

export const START_FETCH_MARK_ALL_NOTIFICATIONS_AS_READ = 'START_FETCH_MARK_ALL_NOTIFICATIONS_AS_READ';
export const FINISH_FETCH_MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS = 'FINISH_FETCH_MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS';
export const FINISH_FETCH_MARK_ALL_NOTIFICATIONS_AS_READ_FAIL = 'FINISH_FETCH_MARK_ALL_NOTIFICATIONS_AS_READ_FAIL';



export const startFetchMarkAllNotificationsAsRead = () => ({
	type: START_FETCH_MARK_ALL_NOTIFICATIONS_AS_READ
})

export const finishFetchMarAllNotificationsAsReadSuccess = () => ({
	type: FINISH_FETCH_MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS
})

export const finishFetchMarAllNotificationsAsReadFail = () => ({
	type: FINISH_FETCH_MARK_ALL_NOTIFICATIONS_AS_READ_FAIL
})

export const addNotificationSolicitud = notification => ({
	type: ADD_NOTIFICATION_SOLICITUD,
	payload: { notification }
})

export const startFetchNotificationsSolicitudes = () => ({
	type: START_FETCH_NOTIFICATIONS_SOLICITUDES,
})

export const setNotificationsSolicitudes = notifications => ({
	type: SET_NOTIFICATIONS_SOLICITUDES,
	payload: { notifications }
})

export const finishFetchNotificationsSolicitudesSuccess = () => ({
	type: FINISH_FETCH_NOTIFICATIONS_SOLICITUDES_SUCCESS,
})

export const finishFetchNotificationsSolicitudesFail = () => ({
	type: FINISH_FETCH_NOTIFICATIONS_SOLICITUDES_FAIL,
})

export const startFetchUserData = () => ({
	type: START_FETCH_USER_DATA,
})

export const setUserData = data => ({
	type: SET_USER_DATA,
	payload: { data },
})

export const setUserDataError = error => ({
	type: SET_USER_DATA_ERROR,
	payload: { error }
})

export const finishFetchUserDataSuccess = () => ({
	type: FINISH_FETCH_USER_DATA_SUCCESS,
})

export const finishFetchUserDataFail = () =>({
	type: FINISH_FETCH_USER_DATA_FAIL,
})

export const setAccessToken = token => ({
	type: SET_ACCESS_TOKEN,
	payload: { token }
})
