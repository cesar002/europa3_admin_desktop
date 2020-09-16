import {
	START_FETCH_MOBILIARIO,
	FINISH_FETCH_MOBILIARIO_SUCCESS,
	FINISH_FETCH_MOBILIARIO_FAIL,
	SET_MOBILIARIO,
} from '../actions/mobiliarioActions'

const initialState = {
	status:{
		mobiliarioStatus:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
	},
	mobiliario: [],
};


export default (state = initialState, action) => {
	switch (action.type) {
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
				mobiliario: action.payload.mobiliario
			}
		default:
			return state;
	}
}

