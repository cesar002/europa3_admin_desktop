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
		}
	},
	solicitudes: [],
	solicitudesPaginated: [],
	solicitudOficinaSelected: {},
}

export default (state = initialState, action) => {
	switch (action.type) {
		case CLEAR_SOLICITUD_OFICINA:
			return{
				...state,
				solicitudOficinaSelected: {},
			}
		case SET_SOLICITUD_OFICINA:
			return {
				...state,
				solicitudOficinaSelected: action.payload.solicitud
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
