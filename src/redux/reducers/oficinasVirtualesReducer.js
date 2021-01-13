import {
	START_FETCH_OFICINAS_VIRTUALES,
	FINISH_FETCH_OFICINAS_VIRTUALES_SUCCESS,
	FINISH_FETCH_OFICINAS_VIRTUALES_FAIL,
	SET_OFICINAS_VIRTUALES,
} from '../actions/oficinasVirtualesActions'

const initialState = {
	status: {
		oficinasVirtuales:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		}
	},
	oficinasVirtuales: [],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case START_FETCH_OFICINAS_VIRTUALES:
			return {
				...state,
				status:{
					...state.status,
					oficinasVirtuales:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		case FINISH_FETCH_OFICINAS_VIRTUALES_SUCCESS:
			return{
				...state,
				status:{
					...state.status,
					oficinasVirtuales:{
						...state.status.oficinasVirtuales,
						start: false,
						finish: true,
						success: true,
					}
				}
			}
		case FINISH_FETCH_OFICINAS_VIRTUALES_FAIL:
			return{
				...state,
				status:{
					...state.status,
					oficinasVirtuales:{
						...state.status.oficinasVirtuales,
						start: false,
						finish: true,
						fail: true,
					}
				}
			}
		case SET_OFICINAS_VIRTUALES:
			return {
				...state,
				oficinasVirtuales: action.payload.oficinas,
			}
		default:
			return state;
	}
}
