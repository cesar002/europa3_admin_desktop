import { chunk } from 'lodash';

import {
	START_FETCH_SOLICITUDES,
	FINISH_FETCH_SOLICITUDES_SUCCESS,
	FINISH_FETCH_SOLICITUDES_FAIL,
	SET_SOLICITUDES,

	START_FETCH_SOLICITUD_OFICINA_BY_ID,
	FINISH_FETCH_SOLICITUD_OFICINA_BY_ID_SUCCESS,
	FINISH_FETCH_SOLICITUD_OFICINA_BY_ID_FAIL,
	SET_SOLICITUD_OFICINA,
	CLEAR_SOLICITUD_OFICINA,

	START_FETCH_SOLICITUD_DOCUMENT_VALIDATE,
	FINISH_FETCH_SOLICITUD_DOCUMENT_VALIDATE_SUCCESS,
	FINISH_FETCH_SOLICITUD_DOCUMENT_VALIDATE_FAIL,
	SET_SOLICITUD_DOCUMENT_VALIDATE,

	START_FETCH_SOLICITUD_DOCUMENT_INVALIDATE,
	FINISH_FETCH_SOLICITUD_DOCUMENT_INVALIDATE_SUCCESS,
	FINISH_FETCH_SOLICITUD_DOCUMENT_INVALIDATE_FAIL,
	SET_SOLICITUD_DOCUMENT_INVALIDATE,

	START_FETCH_SOLICITUD_AUTORIZAR,
	FINISH_FETCH_SOLICITUD_AUTORIZAR_SUCCESS,
	FINISH_FETCH_SOLICITUD_AUTORIZAR_FAIL,
	MARK_SOLICITUD_TO_AUTORIZADO,

	START_FETCH_SOLICITUD_NO_AUTORIZAR,
	FINISH_FETCH_SOLICITUD_NO_AUTORIZAR_SUCCESS,
	FINISH_FETCH_SOLICITUD_NO_AUTORIZAR_FAIL,
	MARK_SOLICITUD_TO_NO_AUTORIZADO,
} from '../actions/solicitudesAction';

const initialState = {
	status: {
		solicitudes: {
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
		solicitudOficinaSelected:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
		autorizacion:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
		noAutorizacion: {
			start: false,
			finish: false,
			success: false,
			fail: false,
		}
	},
	solicitudes: [],
	solicitudesPaginated: [],
	solicitudOficinaSelected: {},
}

export default (state = initialState, action) => {
	switch (action.type) {
		case MARK_SOLICITUD_TO_NO_AUTORIZADO:
			return {
				...state,
				solicitudOficinaSelected: {
					...state.solicitudOficinaSelected,
					estado: {
						id: 3,
						nombre: 'No Autorizado',
					},
				}
			}
		case FINISH_FETCH_SOLICITUD_NO_AUTORIZAR_FAIL:
			return {
				...state,
				status:{
					...state.status,
					noAutorizacion:{
						...state.status.noAutorizacion,
						start: false,
						finish: true,
						fail: true,
					}
				}
			}
		case FINISH_FETCH_SOLICITUD_NO_AUTORIZAR_SUCCESS:
			return {
				...state,
				status:{
					...state.status,
					noAutorizacion:{
						...state.status.noAutorizacion,
						start: false,
						finish: true,
						success: true,
					}
				}
			}
		case START_FETCH_SOLICITUD_NO_AUTORIZAR:
			return {
				...state,
				status:{
					...state.status,
					noAutorizacion:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		case MARK_SOLICITUD_TO_AUTORIZADO:
			return {
				...state,
				solicitudOficinaSelected: {
					...state.solicitudOficinaSelected,
					estado: {
						id: 2,
						nombre: 'Autorizado',
					},
				}
			}
		case FINISH_FETCH_SOLICITUD_AUTORIZAR_FAIL:
			return {
				...state,
				status:{
					...state.status,
					autorizacion:{
						...state.status.autorizacion,
						start: false,
						finish: true,
						fail: true,
					}
				}
			}
		case FINISH_FETCH_SOLICITUD_AUTORIZAR_SUCCESS:
			return {
				...state,
				status:{
					...state.status,
					autorizacion:{
						...state.status.autorizacion,
						start: false,
						finish: true,
						success: true,
					}
				}
			}
		case START_FETCH_SOLICITUD_AUTORIZAR:
			return {
				...state,
				status:{
					...state.status,
					autorizacion:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		case SET_SOLICITUD_DOCUMENT_INVALIDATE:
			return {
				...state,
				solicitudOficinaSelected: {
					...state.solicitudOficinaSelected,
					documentos: state.solicitudOficinaSelected.documentos.map(d =>
						d.id !== action.payload.id
						? d
						: { ...d, validado: false }
					)
				}
			}
		case FINISH_FETCH_SOLICITUD_DOCUMENT_INVALIDATE_FAIL:
			return {
				...state,
				solicitudOficinaSelected: {
					...state.solicitudOficinaSelected,
					documentos: state.solicitudOficinaSelected.documentos.map(d =>
						d.id !== action.payload.id
						? d
						: { ...d, startFetching: false }
					)
				}
			}
		case FINISH_FETCH_SOLICITUD_DOCUMENT_INVALIDATE_SUCCESS:
			return {
				...state,
				solicitudOficinaSelected: {
					...state.solicitudOficinaSelected,
					documentos: state.solicitudOficinaSelected.documentos.map(d =>
						d.id !== action.payload.id
						? d
						: { ...d, startFetching: false }
					)
				}
			}
		case START_FETCH_SOLICITUD_DOCUMENT_INVALIDATE:
			return {
				...state,
				solicitudOficinaSelected: {
					...state.solicitudOficinaSelected,
					documentos: state.solicitudOficinaSelected.documentos.map(d =>
						d.id !== action.payload.id
						? d
						: { ...d, startFetching: true }
					)
				}
			}
		case SET_SOLICITUD_DOCUMENT_VALIDATE:
			return {
				...state,
				solicitudOficinaSelected: {
					...state.solicitudOficinaSelected,
					documentos: state.solicitudOficinaSelected.documentos.map(d =>
						d.id !== action.payload.id
						? d
						: { ...d, validado: true}
					)
				}
			}
		case FINISH_FETCH_SOLICITUD_DOCUMENT_VALIDATE_FAIL:
			return {
				...state,
				solicitudOficinaSelected: {
					...state.solicitudOficinaSelected,
					documentos: state.solicitudOficinaSelected.documentos.map(d =>
						d.id !== action.payload.id
						? d
						: { ...d, startFetching: false }
					)
				}
			}
		case FINISH_FETCH_SOLICITUD_DOCUMENT_VALIDATE_SUCCESS:
			return {
				...state,
				solicitudOficinaSelected: {
					...state.solicitudOficinaSelected,
					documentos: state.solicitudOficinaSelected.documentos.map(d =>
						d.id !== action.payload.id
						? d
						: { ...d, startFetching: false }
					)
				}
			}
		case START_FETCH_SOLICITUD_DOCUMENT_VALIDATE:
			return {
				...state,
				solicitudOficinaSelected: {
					...state.solicitudOficinaSelected,
					documentos: state.solicitudOficinaSelected.documentos.map(d =>
						d.id !== action.payload.id
						? d
						: { ...d, startFetching: true }
					)
				}
			}
		case CLEAR_SOLICITUD_OFICINA:
			return{
				...state,
				status:{
					...state.status,
					solicitudOficinaSelected:{
						start: false,
						finish: false,
						success: false,
						fail: false,
					}
				},
				solicitudOficinaSelected: {},
			}
		case SET_SOLICITUD_OFICINA:
			return {
				...state,
				solicitudOficinaSelected:{
					...action.payload.solicitud,
					documentos: action.payload.solicitud.documentos.map(d => ({...d, startFetching: false}))
				}
			}
		case FINISH_FETCH_SOLICITUD_OFICINA_BY_ID_FAIL:
			return {
				...state,
				status:{
					...state.status,
					solicitudOficinaSelected:{
						...state.status.solicitudOficinaSelected,
						start: false,
						finish: true,
						fail: true,
					}
				}
			}
		case FINISH_FETCH_SOLICITUD_OFICINA_BY_ID_SUCCESS:
			return {
				...state,
				status:{
					...state.status,
					solicitudOficinaSelected:{
						...state.status.solicitudOficinaSelected,
						start: false,
						finish: true,
						success: true,
					}
				}
			}
		case START_FETCH_SOLICITUD_OFICINA_BY_ID:
			return{
				...state,
				status:{
					...state.status,
					solicitudOficinaSelected:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		case START_FETCH_SOLICITUDES:
			return {
				...state,
				status:{
					...state.status,
					solicitudes:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		case FINISH_FETCH_SOLICITUDES_SUCCESS:
			return {
				...state,
				status: {
					...state.status,
					solicitudes:{
						...state.status.solicitudes,
						start: false,
						finish: true,
						success: true,
					}
				}
			}
		case FINISH_FETCH_SOLICITUDES_FAIL:
			return {
				...state,
				status: {
					...state.status,
					solicitudes:{
						...state.status.solicitudes,
						start: false,
						finish: true,
						fail: true,
					}
				}
			}
		case SET_SOLICITUDES:
			return {
				...state,
				solicitudes: action.payload.solicitudes,
				solicitudesPaginated: chunk(action.payload.solicitudes, 10),
			}
		default:
			return state
	}
}
