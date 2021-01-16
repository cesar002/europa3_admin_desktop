import {
	START_FETCH_ADICIONALES,
	FINISH_FETCH_ADICIONALES_SUCCESS,
	FINISH_FETCH_ADICIONALES_FAIL,
	SET_ADICIONALES,
	START_FETCH_CAT_UNIDADES_ADICIONALES,
	FINISH_FETCH_CAT_UNIDADES_ADICIONALES_SUCCESS,
	FINISH_FETCH_CAT_UNIDADES_ADICIONALES_FAIL,
	SET_CAT_UNIDADES_ADICIONALES,
	SELECT_ADICIONAL,
	CLEAR_SELECTED_ADICIONAL,
} from '../actions/adicionalesActions';

const initialState = {
	status:{
		adicionales:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
		unidades:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
	},
	adicionales: [],
	unidades: [],
	adicionalSelected: {},
}

export default ( state = initialState, action ) => {
	switch (action.type) {
		case CLEAR_SELECTED_ADICIONAL:
			return {
				...state,
				adicionalSelected: {},
			}
		case SELECT_ADICIONAL:
			return {
				...state,
				adicionalSelected: state.adicionales.find(ad => ad.id === action.payload.id),
			}
		case SET_CAT_UNIDADES_ADICIONALES:
			return{
				...state,
				unidades: action.payload.unidades,
			}
		case FINISH_FETCH_CAT_UNIDADES_ADICIONALES_FAIL:
			return {
				...state,
				status:{
					...state.status,
					unidades:{
						...state.status.unidades,
						start: false,
						finish: true,
						fail: true,
					}
				}
			}
		case FINISH_FETCH_CAT_UNIDADES_ADICIONALES_SUCCESS:
			return{
				...state,
				status:{
					...state.status,
					unidades:{
						...state.status.unidades,
						start: false,
						finish: true,
						success: true,
					}
				}
			}
		case START_FETCH_CAT_UNIDADES_ADICIONALES:
			return{
				...state,
				status:{
					...state.status,
					unidades:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					},
				}
			}
		case START_FETCH_ADICIONALES:
			return {
				...state,
				status:{
					...state.state,
					adicionales:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					},
				},
			}
		case FINISH_FETCH_ADICIONALES_SUCCESS:
			return{
				...state,
				status:{
					...state.state,
					adicionales:{
						...state.status.adicionales,
						start: false,
						finish: true,
						success: true,
					},
				},
			}
		case FINISH_FETCH_ADICIONALES_FAIL:
			return{
				...state,
				status:{
					...state.state,
					adicionales:{
						...state.status.adicionales,
						start: false,
						finish: true,
						fail: true,
					},
				},
			}
		case SET_ADICIONALES:
			return {
				...state,
				adicionales: action.payload.adicionales,
			}
		default:
			return state;
	}
}
