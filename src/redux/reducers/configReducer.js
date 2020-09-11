import {
	START_FETCH_OFICINA_SIZES,
	SET_OFICINAS_SIZES,
	FINISH_FETCH_OFICINA_SIZES_SUCCESS,
	FINISH_FETCH_OFICINA_SIZES_FAIL,

} from '../actions/configAction';

const initialState = {
	status:{
		statusOficinaSizes:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
	},
	oficinasSizes: [],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case START_FETCH_OFICINA_SIZES:
			return {
				...state,
				status:{
					...state.status,
					statusOficinaSizes:{
						...state.status.statusOficinaSizes,
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
