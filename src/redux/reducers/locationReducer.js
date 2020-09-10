import {
	FINISH_FETCH_ESTADOS_FAIL,
	FINISH_FETCH_ESTADOS_SUCCESS,
	FINISH_FETCH_LOCALIDADES_FAIL,
	FINISH_FETCH_LOCALIDADES_SUCCESS,
	FINISH_FETCH_MUNICIPIOS_FAIL,
	FINISH_FETCH_MUNICIPIOS_SUCCESS,
	START_FETCH_ESTADOS,
	SET_ESTADOS,
	SET_LOCALIDADES,
	SET_MUNICIPIOS,
	START_FETCH_LOCALIDADES,
	START_FETCH_MUNICIPIOS,
} from '../actions/locationActions'

const initialState = {
	status:{
		statusMunicipios: {
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
		statusEstados: {
			start: false,
			finish: false,
			success: false,
			fail: false,
		}
	},
	estados: [],
	municipios: [],
};


export default (state = initialState, action) => {
	switch (action.type) {
		case SET_MUNICIPIOS:
			return{
				...state,
				municipios: action.payload.municipios
			}
		case START_FETCH_MUNICIPIOS:
			return {
				...state,
				status: {
					...state.status,
					statusMunicipios:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		case FINISH_FETCH_MUNICIPIOS_SUCCESS:
			return{
				...state,
				status:{
					...state.status,
					statusMunicipios:{
						...state.status.statusMunicipios,
						start: false,
						finish: true,
						success: true,
					}
				}
			}
		case FINISH_FETCH_MUNICIPIOS_FAIL:
			return{
				...state,
				status:{
					...state.status,
					statusMunicipios:{
						...state.status.statusMunicipios,
						start: false,
						finish: true,
						fail: true,
					}
				}
			}
		case START_FETCH_ESTADOS:
			return {
				...state,
				status:{
					...state.status,
					statusEstados:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		case FINISH_FETCH_ESTADOS_SUCCESS:
			return{
				...state,
				status:{
					...state.status,
					statusEstados:{
						...state.status.statusEstados,
						start: false,
						finish: true,
						success: true,
					}
				}
			}
		case FINISH_FETCH_ESTADOS_FAIL:
			return{
				...state,
				status:{
					...state.status,
					statusEstados:{
						...state.status.statusEstados,
						start: false,
						finish: true,
						fail: true,
					}
				}
			}
		case SET_ESTADOS:
			return{
				...state,
				estados: action.payload.estados
			}
		default:
			return state;
	}
}
