import {
	START_FETCH_USUARIOS_ADMIN,
	FINISH_FETCH_USUARIOS_ADMIN_SUCCESS,
	FINISH_FETCH_USUARIOS_ADMIN_FAIL,
	SET_USUARIOS_ADMIN,
} from '../actions/gestionUsuariosActions'

const initialState = {
	status: {
		usuariosAdmin:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
	},
	usuariosAdmin: [],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_USUARIOS_ADMIN:
			return {
				...state,
				usuariosAdmin: action.payload.usuarios
			}
		case FINISH_FETCH_USUARIOS_ADMIN_FAIL:
			return {
				...state,
				status:{
					...state.status,
					usuariosAdmin:{
						...state.status.usuariosAdmin,
						start: false,
						finish: false,
						fail: true,
					}
				}
			}
		case FINISH_FETCH_USUARIOS_ADMIN_SUCCESS:
			return {
				...state,
				status:{
					...state.status,
					usuariosAdmin:{
						...state.status.usuariosAdmin,
						start: false,
						finish: false,
						success: true,
					}
				}
			}
		case START_FETCH_USUARIOS_ADMIN:
			return {
				...state,
				status:{
					...state.status,
					usuariosAdmin: {
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		default:
			return state;
	}
}
