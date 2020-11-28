export const START_FETCH_SOLICITUDES = 'START_FETCH_SOLICITUDES';
export const FINISH_FETCH_SOLICITUDES_SUCCESS = 'FINISH_FETCH_SOLICITUDES_SUCCESS';
export const FINISH_FETCH_SOLICITUDES_FAIL = 'FINISH_FETCH_SOLICITUDES_FAIL';
export const SET_SOLICITUDES = 'SET_SOLICITUDES';

export const START_FETCH_SOLICITUD_OFICINA_BY_ID = 'START_FETCH_SOLICITUD_OFICINA_BY_ID';
export const FINISH_FETCH_SOLICITUD_OFICINA_BY_ID_SUCCESS = 'FINISH_FETCH_SOLICITUD_OFICINA_BY_ID_SUCCESS';
export const FINISH_FETCH_SOLICITUD_OFICINA_BY_ID_FAIL = 'FINISH_FETCH_SOLICITUD_OFICINA_BY_ID_FAIL';
export const SET_SOLICITUD_OFICINA = 'SET_SOLICITUD_OFICINA';
export const CLEAR_SOLICITUD_OFICINA = 'CLEAR_SOLICITUD_OFICINA';

export const START_FETCH_SOLICITUD_DOCUMENT_VALIDATE = 'START_FETCH_SOLICITUD_DOCUMENT_VALIDATE';
export const FINISH_FETCH_SOLICITUD_DOCUMENT_VALIDATE_SUCCESS = 'FINISH_FETCH_SOLICITUD_DOCUMENT_VALIDATE_SUCCESS';
export const FINISH_FETCH_SOLICITUD_DOCUMENT_VALIDATE_FAIL = 'FINISH_FETCH_SOLICITUD_DOCUMENT_VALIDATE_FAIL';
export const SET_SOLICITUD_DOCUMENT_VALIDATE = 'SET_SOLICITUD_DOCUMENT_VALIDATE';

export const START_FETCH_SOLICITUD_DOCUMENT_INVALIDATE = 'START_FETCH_SOLICITUD_DOCUMENT_INVALIDATE';
export const FINISH_FETCH_SOLICITUD_DOCUMENT_INVALIDATE_SUCCESS = 'FINISH_FETCH_SOLICITUD_DOCUMENT_INVALIDATE_SUCCESS';
export const FINISH_FETCH_SOLICITUD_DOCUMENT_INVALIDATE_FAIL = 'FINISH_FETCH_SOLICITUD_DOCUMENT_INVALIDATE_FAIL';
export const SET_SOLICITUD_DOCUMENT_INVALIDATE = 'SET_SOLICITUD_DOCUMENT_INVALIDATE';

export const START_FETCH_SOLICITUD_AUTORIZAR = 'START_FETCH_SOLICITUD_AUTORIZAR';
export const FINISH_FETCH_SOLICITUD_AUTORIZAR_SUCCESS = 'FINISH_FETCH_SOLICITUD_AUTORIZAR_SUCCESS';
export const FINISH_FETCH_SOLICITUD_AUTORIZAR_FAIL = 'FINISH_FETCH_SOLICITUD_AUTORIZAR_FAIL';
export const MARK_SOLICITUD_TO_AUTORIZADO = 'MARK_SOLICITUD_TO_AUTORIZADO';

export const START_FETCH_SOLICITUD_NO_AUTORIZAR = 'START_FETCH_SOLICITUD_NO_AUTORIZAR';
export const FINISH_FETCH_SOLICITUD_NO_AUTORIZAR_SUCCESS = 'FINISH_FETCH_SOLICITUD_NO_AUTORIZAR_SUCCESS';
export const FINISH_FETCH_SOLICITUD_NO_AUTORIZAR_FAIL = 'FINISH_FETCH_SOLICITUD_NO_AUTORIZAR_FAIL';
export const MARK_SOLICITUD_TO_NO_AUTORIZADO = 'MARK_SOLICITUD_TO_NO_AUTORIZADO';



export const markSolicitudToNoAutorizado = () => ({
	type: MARK_SOLICITUD_TO_NO_AUTORIZADO
})

export const finishFetchSolicitudNoAutorizarFail = () => ({
	type: FINISH_FETCH_SOLICITUD_NO_AUTORIZAR_FAIL,
})

export const finishFetchSolicitudNoAutorizarSuccess = () => ({
	type: FINISH_FETCH_SOLICITUD_NO_AUTORIZAR_SUCCESS,
})

export const startFetchSolicitudNoAutorizar = id => ({
	type: START_FETCH_SOLICITUD_NO_AUTORIZAR,
	payload: { id },
})

export const startFetchSolicitudAutorizar = id => ({
	type: START_FETCH_SOLICITUD_AUTORIZAR,
	payload: { id },
})

export const finishFetchSolicitudAutorizarSuccess = () => ({
	type: FINISH_FETCH_SOLICITUD_AUTORIZAR_SUCCESS,
})

export const finishFetchSolicitudAutorizarFail = () => ({
	type: FINISH_FETCH_SOLICITUD_AUTORIZAR_FAIL,
})

export const markSolicitudToAutorizado = () => ({
	type: MARK_SOLICITUD_TO_AUTORIZADO,
})

export const startFetchSolicitudDocumentValidate = id => ({
	type: START_FETCH_SOLICITUD_DOCUMENT_VALIDATE,
	payload: { id }
})

export const finishFetchSolicitudDocumentValidateSuccess = id => ({
	type: FINISH_FETCH_SOLICITUD_DOCUMENT_VALIDATE_SUCCESS,
	payload: { id }
})

export const finishFetchSolicitudDocumentValidateFail = id => ({
	type: FINISH_FETCH_SOLICITUD_DOCUMENT_VALIDATE_FAIL,
	payload: { id }
})

export const setSolicitudDocumentValidate = id => ({
	type: SET_SOLICITUD_DOCUMENT_VALIDATE,
	payload: { id }
})

export const startFetchSolicitudDocumentInvalidate = id => ({
	type: START_FETCH_SOLICITUD_DOCUMENT_INVALIDATE,
	payload: { id }
})

export const finishFetchSolicitudInvalidateSuccess = id => ({
	type: FINISH_FETCH_SOLICITUD_DOCUMENT_INVALIDATE_SUCCESS,
	payload: { id }
})

export const finishFetchSolicitudInvalidateFail = id => ({
	type: FINISH_FETCH_SOLICITUD_DOCUMENT_INVALIDATE_FAIL,
	payload: { id }
})

export const setSolicitudDocumentInvalidate = id => ({
	type: SET_SOLICITUD_DOCUMENT_INVALIDATE,
	payload: { id }
})

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
