import {
	START_FETCH_SALA_JUNTAS,
	SET_SALA_JUNTAS,
	FINISH_FETCH_SALA_JUNTAS_FAIL,
	FINISH_FETCH_SALA_JUNTAS_SUCCESS,
	SELECT_SALA_JUNTAS,
	FILTER_SALA_JUNTAS_BY_EDIFICIO_ID,
	START_FETCH_IMAGES_SALA_JUNTAS,
	FINISH_FETCH_IMAGES_SALA_JUNTAS_SUCCESS,
	FINISH_FETCH_IMAGES_SALA_JUNTAS_FAIL,
	SET_IMAGES_TO_SALA_JUNTAS_SELECTED,
	REMOVE_IMAGE_TO_SALA_JUNTAS_SELECTED,
} from '../actions/salaJuntasActions';


const initialState = {
	status:{
		salaJuntas:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
		imagesSalaJuntas:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
	},
	salaJuntas: [],
	salaJuntasFilter: [],
	salaJuntasSelected: {},
}


export default (state = initialState, action) => {
	switch (action.type) {
		case REMOVE_IMAGE_TO_SALA_JUNTAS_SELECTED:
			return{
				...state,
				salaJuntasSelected:{
					...state.salaJuntasSelected,
					images: state.salaJuntasSelected.images.filter(img => img.id !== action.payload.id),
				}
			}
		case START_FETCH_IMAGES_SALA_JUNTAS:
			return{
				...state,
				status:{
					...state.status,
					imagesSalaJuntas:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		case FINISH_FETCH_IMAGES_SALA_JUNTAS_SUCCESS:
			return{
				...state,
				status:{
					...state.status,
					imagesSalaJuntas:{
						...state.status.imagesSalaJuntas,
						start: false,
						finish: true,
						success: true,
					}
				}
			}
		case SET_IMAGES_TO_SALA_JUNTAS_SELECTED:
			return{
				...state,
				salaJuntasSelected:{
					...state.salaJuntasSelected,
					images: action.payload.images,
				}
			}
		case FINISH_FETCH_IMAGES_SALA_JUNTAS_FAIL:
			return{
				...state,
				status:{
					...state.status,
					imagesSalaJuntas:{
						...state.status.imagesSalaJuntas,
						start: false,
						finish: true,
						fail: true,
					}
				}
			}
		case FILTER_SALA_JUNTAS_BY_EDIFICIO_ID:
			return{
				...state,
				salaJuntasFilter: state.salaJuntas.filter(s => s.edificio.id === action.payload.id)
			}
		case SELECT_SALA_JUNTAS:
			return{
				...state,
				salaJuntasSelected: state.salaJuntas.find(s => s.id === action.payload.id)
			}
		case SET_SALA_JUNTAS:
			return{
				...state,
				salaJuntas: action.payload.salaJuntas,
				salaJuntasFilter: action.payload.salaJuntas,
			}
		case START_FETCH_SALA_JUNTAS:
			return{
				...state,
				status:{
					...state.status,
					salaJuntas:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		case FINISH_FETCH_SALA_JUNTAS_SUCCESS:
			return{
				...state,
				status:{
					...state.status,
					salaJuntas:{
						...state.status.salaJuntas,
						start: false,
						finish: true,
						success: true,
					}
				}
			}
		case FINISH_FETCH_SALA_JUNTAS_FAIL:
			return{
				...state,
				status:{
					...state.status,
					salaJuntas:{
						...state.status.salaJuntas,
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
