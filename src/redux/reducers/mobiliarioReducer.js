import {
	START_FETCH_MOBILIARIO,
	FINISH_FETCH_MOBILIARIO_SUCCESS,
	FINISH_FETCH_MOBILIARIO_FAIL,
	SET_MOBILIARIO,

	START_FETCH_TIPO_MOBILIARIO,
	SET_TIPO_MOBILIARIO,
	FINISH_FETCH_TIPO_MOBILIARIO_SUCCESS,
	FINISH_FETCH_TIPO_MOBILIARIO_FAIL,

	START_FETCH_MOBILIARIO_BY_EDIFICIO_ID,
	SET_MOBILIARIO_BY_EDIFICIO,
	FINISH_FETCH_MOBILIARIO_BY_EDIFICIO_ID_SUCCESS,
	FINISH_FETCH_MOBILIARIO_BY_EDIFICIO_ID_FAIL,
	ADD_MOBILIARIO_TO_MOBILIARIO_OFICINA,

	UPDATE_CANTIDAD_MOBILIARIO_TO_MOBILIARIO_OFICINA,
	DELETE_MOBILIARIO_IN_MOBILIARIO_OFICINA,
	CLEAR_MOBILIARIO_OFICINA,
} from '../actions/mobiliarioActions'

const initialState = {
	status:{
		mobiliarioStatus:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
		tipoMobiliarioStatus:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
		mobiliarioByEdificioStatus:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
	},
	mobiliarioCreate:{
		mobiliario: [],
		mobiliarioOficina: [],
	},
	tipoMobiliario: [],
	mobiliario: [],
	mobiliarioFilter: [],
};


export default (state = initialState, action) => {
	switch (action.type) {
		case CLEAR_MOBILIARIO_OFICINA:
			return{
				...state,
				mobiliarioCreate:{
					...state.mobiliarioCreate,
					mobiliarioOficina: [],
				}
			}
		case DELETE_MOBILIARIO_IN_MOBILIARIO_OFICINA:
			return{
				...state,
				mobiliarioCreate:{
					...state.mobiliarioCreate,
					mobiliarioOficina: state.mobiliarioCreate.mobiliarioOficina.filter(m => m.id !== action.payload.id)
				}
			}
		case UPDATE_CANTIDAD_MOBILIARIO_TO_MOBILIARIO_OFICINA:
			return{
				...state,
				mobiliarioCreate:{
					...state.mobiliarioCreate,
					mobiliarioOficina: state.mobiliarioCreate.mobiliarioOficina.map(m => m.id == action.payload.id ?
												{...m, cantidad: action.payload.cantidad} : m)
				}
			}
		case START_FETCH_MOBILIARIO_BY_EDIFICIO_ID:
			return{
				...state,
				status:{
					...state.status,
					mobiliarioByEdificioStatus:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		case SET_MOBILIARIO_BY_EDIFICIO:
			return{
				...state,
				mobiliarioCreate: {
					...state.mobiliarioCreate,
					mobiliario: action.payload.mobiliario,
				}
			}
		case FINISH_FETCH_MOBILIARIO_BY_EDIFICIO_ID_SUCCESS:
			return{
				...state,
				status:{
					...state.status,
					mobiliarioByEdificioStatus:{
						...state.status.mobiliarioByEdificioStatus,
						start: false,
						finish: false,
						success: true,
					}
				}
			}
		case FINISH_FETCH_MOBILIARIO_BY_EDIFICIO_ID_FAIL:
			return{
				...state,
				status:{
					...state.status,
					mobiliarioByEdificioStatus:{
						...state.status.mobiliarioByEdificioStatus,
						start: false,
						finish: false,
						fail: true,
					}
				}
			}
		case ADD_MOBILIARIO_TO_MOBILIARIO_OFICINA:
			let mob = state.mobiliarioCreate.mobiliario.find(m => m.id == action.payload.id);
			return{
				...state,
				mobiliarioCreate:{
					...state.mobiliarioCreate,
					mobiliarioOficina: [...state.mobiliarioCreate.mobiliarioOficina, {...mob, cantidad: 1}]
				}
			}
		case START_FETCH_TIPO_MOBILIARIO:
			return{
				...state,
				status:{
					...state.status,
					tipoMobiliarioStatus:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		case SET_TIPO_MOBILIARIO:
			return{
				...state,
				tipoMobiliario: action.payload.tipo,
			}
		case FINISH_FETCH_TIPO_MOBILIARIO_SUCCESS:
			return{
				...state,
				status:{
					...state.status,
					tipoMobiliarioStatus:{
						...state.status.tipoMobiliarioStatus,
						start: false,
						finish: false,
						success: true,
					}
				}
			}
		case FINISH_FETCH_TIPO_MOBILIARIO_FAIL:
			return{
				...state,
				status:{
					...state.status,
					tipoMobiliarioStatus:{
						...state.status.tipoMobiliarioStatus,
						start: false,
						finish: false,
						fail: true,
					}
				}
			}
		case START_FETCH_MOBILIARIO:
			return {
				...state,
				status:{
					...state.status,
					mobiliarioStatus:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					},
				}
			}
		case FINISH_FETCH_MOBILIARIO_SUCCESS:
			return {
				...state,
				status:{
					...state.status,
					mobiliarioStatus:{
						...state.status.mobiliarioStatus,
						start: false,
						finish: false,
						success: true,
					},
				}
			}
		case FINISH_FETCH_MOBILIARIO_FAIL:
			return {
				...state,
				status:{
					...state.status,
					mobiliarioStatus:{
						...state.status.mobiliarioStatus,
						start: false,
						finish: false,
						fail: true,
					},
				}
			}
		case SET_MOBILIARIO:
			return{
				...state,
				mobiliario: action.payload.mobiliario,
				mobiliarioFilter: action.payload.mobiliario,
			}
		default:
			return state;
	}
}

