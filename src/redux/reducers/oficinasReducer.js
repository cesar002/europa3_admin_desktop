import {
	START_FETCH_OFICINAS,
	START_FETCH_OFICINAS_BY_EDIFICIO_ID,
	SET_OFICINAS,
	FINISH_FETCH_OFICINAS_SUCCESS,
	FINISH_FETCH_OFICINAS_FAIL,
	FIND_OFICINA_BY_ID,
	FILTER_OFICINA_BY_EDIFICIO_ID,
} from '../actions/oficinasActions'

const initialState = {
	status:{
		oficinasStatus:{
			start: false,
			finish:false,
			success: false,
			fail: false,
		}
	},
	oficinas: [],
	oficinasFilter: [],
	selectedOficina: {},
}

export default (state = initialState, action) => {
	switch (action.type) {
		case START_FETCH_OFICINAS:
			return {
				...state,
				status:{
					...state.status,
					oficinasStatus:{
						start: true,
						finish:false,
						success: false,
						fail: false,
					}
				}
			}
		case START_FETCH_OFICINAS_BY_EDIFICIO_ID:
			return {
				...state,
				status:{
					...state.status,
					oficinasStatus:{
						start: true,
						finish:false,
						success: false,
						fail: false,
					}
				}
			}
		case SET_OFICINAS:
			return{
				...state,
				oficinas: action.payload.oficinas,
				oficinasFilter: action.payload.oficinas,
			}
		case FINISH_FETCH_OFICINAS_SUCCESS:
			return{
				...state,
				status:{
					...state.status,
					oficinasStatus:{
						...state.status.oficinasStatus,
						start: false,
						finish: true,
						success: true,
					}
				}
			}
		case FINISH_FETCH_OFICINAS_FAIL:
			return{
				...state,
				status:{
					...state.status,
					oficinasStatus: {
						...state.status.oficinasStatus,
						start: false,
						finish:false,
						fail: true,
					}
				}
			}
		case FIND_OFICINA_BY_ID:
			return{
				...state,
				selectedOficina: state.oficinas.find(o => o.id == action.payload.id)
			}
		case FILTER_OFICINA_BY_EDIFICIO_ID:
			return{
				...state,
				oficinasFilter: state.oficinas.filter(o => o.edificio.id === action.payload.id)
			}
		default:
			return state;
	}
}
