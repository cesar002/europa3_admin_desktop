import {
	START_FETCH_OFICINA_SIZES,
	SET_OFICINAS_SIZES,
	FINISH_FETCH_OFICINA_SIZES_SUCCESS,
	FINISH_FETCH_OFICINA_SIZES_FAIL,
	START_FETCH_CAT_TIEMPOS_RENTA,
	SET_CAT_TIEMPOS_RENTA,
	FINISH_FETCH_CAT_TIEMPO_RENTA_SUCCESS,
	FINISH_FETCH_CAT_TIEMPO_RENTA_FAIL,
} from '../actions/configAction';

const initialState = {
	status:{
		statusOficinaSizes:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
		catTiemposRenta:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
	},
	oficinasSizes: [],
	catTiemposRenta: [],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case START_FETCH_CAT_TIEMPOS_RENTA:
			return{
				...state,
				status:{
					...state.status,
					catTiemposRenta:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		case SET_CAT_TIEMPOS_RENTA:
			return{
				...state,
				catTiemposRenta: action.payload.tipos
			}
		case FINISH_FETCH_CAT_TIEMPO_RENTA_FAIL:
			return{
				...state,
				status:{
					...state.status,
					catTiemposRenta:{
						...state.status.catTiemposRenta,
						start: false,
						finish: false,
						fail: true,
					}
				}
			}
		case FINISH_FETCH_CAT_TIEMPO_RENTA_SUCCESS:
			return{
				...state,
				status:{
					...state.status,
					catTiemposRenta:{
						...state.status.catTiemposRenta,
						start: false,
						finish: false,
						success: true,
					}
				}
			}
		case START_FETCH_OFICINA_SIZES:
			return {
				...state,
				status:{
					...state.status,
					statusOficinaSizes:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		case SET_OFICINAS_SIZES:
			return{
				...state,
				oficinasSizes: action.payload.sizes,
			}
		case FINISH_FETCH_OFICINA_SIZES_SUCCESS:
			return{
				...state,
				status:{
					...state.status,
					statusOficinaSizes:{
						...state.status.statusOficinaSizes,
						start: false,
						finish: true,
						success: true,
					}
				}
			}
		case FINISH_FETCH_OFICINA_SIZES_FAIL:
			return{
				...state,
				status:{
					...state.status,
					statusOficinaSizes:{
						...state.status.statusOficinaSizes,
						start: false,
						finish: true,
						fail: true,
					}
				}
			}
		default:
			return state;
	}
}
