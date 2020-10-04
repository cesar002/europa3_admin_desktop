import {
	START_FETCH_SALA_JUNTAS,
	SET_SALA_JUNTAS,
	FINISH_FETCH_SALA_JUNTAS_FAIL,
	FINISH_FETCH_SALA_JUNTAS_SUCCESS,
	SELECT_SALA_JUNTAS,
	FILTER_SALA_JUNTAS_BY_EDIFICIO_ID,
} from '../actions/salaJuntasActions';


const initialState = {
	status:{
		salaJuntas:{
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
						finish: false,
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
						finish: false,
						fail: true,
					}
				}
			}
		default:
			return state;
	}
}
