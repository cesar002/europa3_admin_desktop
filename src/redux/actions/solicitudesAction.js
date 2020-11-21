export const START_FETCH_SOLICITUDES = 'START_FETCH_SOLICITUDES';
export const FINISH_FETCH_SOLICITUDES_SUCCESS = 'FINISH_FETCH_SOLICITUDES_SUCCESS';
export const FINISH_FETCH_SOLICITUDES_FAIL = 'FINISH_FETCH_SOLICITUDES_FAIL';
export const SET_SOLICITUDES = 'SET_SOLICITUDES';


export const startFetchSolicitudes = () => ({
	type: START_FETCH_SOLICITUDES,
})

export const finishFetchSolicitudesSuccess = () => ({
	type: FINISH_FETCH_SOLICITUDES_SUCCESS,
})

export const finishFetchSolicitudesFail = () => ({
	type: FINISH_FETCH_SOLICITUDES_FAIL,
})

export const setSolicitudes = solicitudes => ({
	type: SET_SOLICITUDES,
	payload: { solicitudes }
})
