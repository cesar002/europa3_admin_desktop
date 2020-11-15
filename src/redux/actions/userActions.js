export const START_FETCH_USER_DATA = 'START_FETCH_USER_DATA';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USER_DATA_ERROR = 'SET_USER_DATA_ERROR';
export const FINISH_FETCH_USER_DATA_SUCCESS = 'FINISH_FETCH_USER_DATA_SUCCESS';
export const FINISH_FETCH_USER_DATA_FAIL = 'FINISH_FETCH_USER_DATA_FAIL';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export const START_FETCH_NOTIFICATIONS = 'START_FETCH_NOTIFICATIONS';
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
export const FINISH_FETCH_NOTIFICATIONS_SUCCESS = 'FINISH_FETCH_NOTIFICATIONS_SUCCESS';
export const FINISH_FETCH_NOTIFICATIONS_FAIL = 'FINISH_FETCH_NOTIFICATIONS_FAIL';


export const startFetchNotifications = () => ({
	type: START_FETCH_NOTIFICATIONS,
})

export const setNotifications = notifications => ({
	type: SET_NOTIFICATIONS,
	payload: { notifications }
})

export const finishFetchNotificationsSuccess = () => ({
	type: FINISH_FETCH_NOTIFICATIONS_SUCCESS,
})

export const finishFetchNotificationsFail = () => ({
	type: FINISH_FETCH_NOTIFICATIONS_FAIL,
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
