export const START_FETCH_LOGIN = 'START_FETCH_LOGIN';
export const FINISH_FETCH_LOGIN_SUCCESS = 'FINISH_FETCH_LOGIN_SUCCESS';
export const FINISH_FETCH_LOGIN_FAIL = 'FINISH_FETCH_LOGIN_FAIL';
export const SET_ERROR_LOGIN = 'SET_ERROR_LOGIN'

export const startFetchLogin = (username, password) => ({
	type: START_FETCH_LOGIN,
	payload: { username, password }
})

export const finishFetchLoginSuccess = () => ({
	type: FINISH_FETCH_LOGIN_SUCCESS,
})

export const finishFetchLoginFail = () => ({
	type: FINISH_FETCH_LOGIN_FAIL,
})

export const setErrorLogin = error => ({
	type: SET_ERROR_LOGIN,
	payload: { error }
})
