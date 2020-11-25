export const START_FETCH_SOLICITUDES = 'START_FETCH_SOLICITUDES';
export const FINISH_FETCH_SOLICITUDES_SUCCESS = 'FINISH_FETCH_SOLICITUDES_SUCCESS';
export const FINISH_FETCH_SOLICITUDES_FAIL = 'FINISH_FETCH_SOLICITUDES_FAIL';
export const SET_SOLICITUDES = 'SET_SOLICITUDES';

export const START_FETCH_SOLICITUD_OFICINA_BY_ID = 'START_FETCH_SOLICITUD_OFICINA_BY_ID';
export const FINISH_FETCH_SOLICITUD_OFICINA_BY_ID_SUCCESS = 'FINISH_FETCH_SOLICITUD_OFICINA_BY_ID_SUCCESS';
export const FINISH_FETCH_SOLICITUD_OFICINA_BY_ID_FAIL = 'FINISH_FETCH_SOLICITUD_OFICINA_BY_ID_FAIL';
export const SET_SOLICITUD_OFICINA = 'SET_SOLICITUD_OFICINA';
export const CLEAR_SOLICITUD_OFICINA = 'CLEAR_SOLICITUD_OFICINA';


export const startFetchSolicitudOficinaById = id => ({
	type: START_FETCH_SOLICITUD_OFICINA_BY_ID,
	payload: { id }
})

export const finishFetchSolicitudOficinaByIdSuccess = () => ({
	type: FINISH_FETCH_SOLICITUD_OFICINA_BY_ID_SUCCESS,
})

export const finishFetchSolicitudOficinaByIdFail = () => ({
	type: FINISH_FETCH_SOLICITUD_OFICINA_BY_ID_FAIL,
})

export const setSolicitudOficina = solicitud => ({
	type: SET_SOLICITUD_OFICINA,
	payload: { solicitud }
})

export const clearSolicitudOficina = () => ({
	type: CLEAR_SOLICITUD_OFICINA,
})

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
