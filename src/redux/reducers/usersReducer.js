import {
	FINISH_FETCH_USERS_FAIL,
	FINISH_FETCH_USERS_SUCCESS,
	SET_USERS,
	START_FETCH_USERS,
	SEARCH_USER,
} from '../actions/usersAction';

const initialState = {
	status:{
		users:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
	},
	users: [],
	usersFilter: [],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SEARCH_USER:
			return{
				...state,
				usersFilter: state.users.filter(u => u.email.includes(action.payload.word))
			}
		case START_FETCH_USERS:
			return {
				...state,
				status:{
					...state.status,
					users:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					},
				}
			}
		case SET_USERS:
			return {
				...state,
				users: action.payload.users,
				usersFilter: action.payload.users,
			}
		case FINISH_FETCH_USERS_SUCCESS:
			return {
				...state,
				status:{
					...state.status,
					users:{
						...state.status.users,
						start: false,
						finish: true,
						success: true,
					}
				}
			}
		case FINISH_FETCH_USERS_FAIL:
			return {
				...state,
				status:{
					...state.status,
					users:{
						...state.status.users,
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
