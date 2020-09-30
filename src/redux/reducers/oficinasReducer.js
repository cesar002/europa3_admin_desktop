import {
	START_FETCH_OFICINAS,
	START_FETCH_OFICINAS_BY_EDIFICIO_ID,
	SET_OFICINAS,
	FINISH_FETCH_OFICINAS_SUCCESS,
	FINISH_FETCH_OFICINAS_FAIL,
	FIND_OFICINA_BY_ID,
	FILTER_OFICINA_BY_EDIFICIO_ID,
	UPDATE_CANTIDAD_MOBILIARIO_TO_OFICINA_UPDATE,
	DELETE_MOBILIARIO_TO_OFICINA_UPDATE,
	ADD_MOBILIARIO_TO_OFICINA_UPDATE,
	DELETE_SERVICIO_TO_OFICINA_UPDATE,
	ADD_SERVICIO_TO_OFICINA_UPDATE,
	DELETE_IMAGE_TO_OFICINA_UPDATE,
	START_FETCH_IMAGES_OFICINA,
	FINISH_FETCH_IMAGES_OFICINA_SUCCESS,
	FINISH_FETCH_IMAGES_OFICINA_FAIL,
	UPDATE_IMAGE_OFICINA_SELECTED,
} from '../actions/oficinasActions'

const initialState = {
	status:{
		oficinasStatus:{
			start: false,
			finish:false,
			success: false,
			fail: false,
		},
		imagesOficinaStatus:{
			start: false,
			finish:false,
			success: false,
			fail: false,
		},
	},
	oficinas: [],
	oficinasFilter: [],
	selectedOficina: {},
}

export default (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_IMAGE_OFICINA_SELECTED:
			return{
				...state,
				selectedOficina:{
					...state.selectedOficina,
					images: action.payload.images,
				}
			}
		case START_FETCH_IMAGES_OFICINA:
			return{
				...state,
				status:{
					...state.status,
					imagesOficinaStatus:{
						start: true,
						finish:false,
						success: false,
						fail: false,
					}
				}
			}
		case FINISH_FETCH_IMAGES_OFICINA_SUCCESS:
			return{
				...state,
				status:{
					...state.status,
					imagesOficinaStatus:{
						...state.status.imagesOficinaStatus,
						start: false,
						finish:false,
						success: true,
					}
				}
			}
		case FINISH_FETCH_IMAGES_OFICINA_FAIL:
			return{
				...state,
				status:{
					...state.status,
					imagesOficinaStatus:{
						...state.status.imagesOficinaStatus,
						start: false,
						finish:false,
						fail: true,
					}
				}
			}
		case DELETE_IMAGE_TO_OFICINA_UPDATE:
			return{
				...state,
				selectedOficina:{
					...state.selectedOficina,
					images: state.selectedOficina.images.filter(o => o.id !== action.payload.id),
				}
			}
		case DELETE_SERVICIO_TO_OFICINA_UPDATE:
			return{
				...state,
				selectedOficina:{
					...state.selectedOficina,
					servicios: state.selectedOficina.servicios.filter(s => s.id !== action.payload.id)
				}
			}
		case ADD_SERVICIO_TO_OFICINA_UPDATE:
			return{
				...state,
				selectedOficina:{
					...state.selectedOficina,
					servicios: [...state.selectedOficina.servicios, action.payload.servicio]
				}
			}
		case ADD_MOBILIARIO_TO_OFICINA_UPDATE:
			return {
				...state,
				selectedOficina:{
					...state.selectedOficina,
					mobiliario: [ ...state.selectedOficina.mobiliario, {...action.payload.mobiliario, cantidad: 1} ],
				}
			}
		case DELETE_MOBILIARIO_TO_OFICINA_UPDATE:
			return{
				...state,
				selectedOficina:{
					...state.selectedOficina,
					mobiliario: state.selectedOficina.mobiliario.filter(m => m.id != action.payload.id),
				}
			}
		case UPDATE_CANTIDAD_MOBILIARIO_TO_OFICINA_UPDATE:
			return {
				...state,
				selectedOficina:{
					...state.selectedOficina,
					mobiliario: state.selectedOficina.mobiliario.map(m => m.id == action.payload.mobiliarioId ?
									{...m, cantidad: action.payload.cantidad} : m),
				}
			}
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
