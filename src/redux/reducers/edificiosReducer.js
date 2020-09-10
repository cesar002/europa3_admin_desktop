import {
	FINISH_FETCH_EDIFICIOS_FAIL,
	FINISH_FETCH_EDIFICIOS_SUCCESS,
	SET_EDIFICIOS,
	SET_FETCH_EDIFICIOS_ERROR,
	START_FETCH_EDIFICIOS,

	START_FETCH_REGISTER_EDIFICIO,
	FINISH_FETCH_REGISTER_EDIFICIO_SUCCESS,
	FINISH_FETCH_REGISTER_EDIFICIO_FAIL,
	SET_REGISTER_EDIFICIO_ERROR,
} from '../actions/edificioAction';

const initialState = {
	status: {
		statusEdificios: {
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
		statusRegister:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
	},
	edificios: [],
	errors: {
		edificios: null,
		edificioRegister: null,
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_REGISTER_EDIFICIO_ERROR:
			return{
				...state,
				errors:{
					...state.errors,
					edificioRegister: action.payload.error,
				}
			}
		case START_FETCH_REGISTER_EDIFICIO:
			return{
				...state,
				status:{
					...state.status,
					statusRegister:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		case FINISH_FETCH_REGISTER_EDIFICIO_SUCCESS:
			return {
				...state,
				status: {
					...state.status,
					statusRegister:{
						...state.status.statusRegister,
						start:false,
						finish: true,
						success: true,
					}
				}
			}
		case FINISH_FETCH_REGISTER_EDIFICIO_FAIL:
			return {
				...state,
				status: {
					...state.status,
					statusRegister:{
						...state.status.statusRegister,
						start: false,
						finish: true,
						fail: true,
					}
				}
			}
		case START_FETCH_EDIFICIOS:
			return {
				...state,
				status:{
					...state.status,
					statusEdificios: {
						start: true,
						finish: false,
						success: false,
						fail: false,
					},
				}
			}
		case FINISH_FETCH_EDIFICIOS_SUCCESS:
			return {
				...state,
				status:{
					...state.status,
					statusEdificios: {
						...state.status.statusEdificios,
						start: false,
						finish: true,
						success: true,
					}
				}
			}
		case FINISH_FETCH_EDIFICIOS_FAIL:
			return {
				...state,
				status:{
					...state.status,
					statusEdificios: {
						...state.status.statusEdificios,
						start: false,
						finish: true,
						fail: true,
					}
				}
			}
		case SET_EDIFICIOS:
			return {
				...state,
				edificios: action.payload.edificios,
			}
		case SET_FETCH_EDIFICIOS_ERROR:
			return {
				...state,
				errors: {
					...state.errors,
					edificios: action.payload.error
				}
			}
		default:
			return state;
	}
}
