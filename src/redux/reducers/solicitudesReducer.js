import {
	START_FETCH_SOLICITUDES,
	FINISH_FETCH_SOLICITUDES_SUCCESS,
	FINISH_FETCH_SOLICITUDES_FAIL,
	SET_SOLICITUDES,
} from '../actions/solicitudesAction';

const initialState = {
	status: {
		solicitudes: {
			start: false,
			finish: false,
			success: false,
			fail: false,
		}
	},
	solicitudes: []
}

export default (state = initialState, action) => {
	switch (action.type) {
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
			}
		default:
			return state
	}
}
