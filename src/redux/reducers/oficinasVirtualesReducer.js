import {
	START_FETCH_OFICINAS_VIRTUALES,
	FINISH_FETCH_OFICINAS_VIRTUALES_SUCCESS,
	FINISH_FETCH_OFICINAS_VIRTUALES_FAIL,
	SET_OFICINAS_VIRTUALES,
	CLEAR_OFICINA_VIRTUAL_SELECTED,
	SELECT_OFICINA_VIRTUAL,
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
	oficinaSelected: {},
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SELECT_OFICINA_VIRTUAL:
			return{
				...state,
				oficinaSelected: state.oficinasVirtuales.find(o => o.id == action.payload.id),
			}
		case CLEAR_OFICINA_VIRTUAL_SELECTED:
			return{
				...state,
				oficinaSelected: {},
			}
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
