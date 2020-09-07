import {
	START_FETCH_LOGIN,
	FINISH_FETCH_LOGIN_SUCCESS,
	FINISH_FETCH_LOGIN_FAIL,
	SET_ERROR_LOGIN,
} from '../actions/loginActions'

const initialState = {
	status: {
		start: false,
		finish: false,
		success: false,
		fail: false,
	},
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case START_FETCH_LOGIN:
			return{
				...state,
				status: {
					start: true,
					finish: false,
					success: false,
					fail: false,
				},
				error: null,
			}
		case FINISH_FETCH_LOGIN_SUCCESS:
			return{
				...state,
				status:{
					...state.status,
					start: false,
					finish: true,
					success: true,
				}
			}
		case FINISH_FETCH_LOGIN_FAIL:
			return{
				...state,
				status:{
					...state.status,
					start: false,
					finish: true,
					fail: true,
				}
			}
		case SET_ERROR_LOGIN:
			return{
				...state,
				error: action.payload.error,
			}
		default:
			return state;
	}
}
