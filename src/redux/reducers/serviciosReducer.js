import {
	START_FETCH_SERVICIOS,
	SET_SERVICIOS,
	FINISH_FETCH_SERVICIOS_SUCCESS,
	FINISH_FETCH_SERVICIOS_FAIL,
	ENABLE_EDIT_SERVICIO,
	DISABLE_EDIT_SERVICIO,
	UPDATE_SERVICIO_TO_SERVICIO,
	RESTORE_SERVICIO_TO_SERVICIO,
	BACKUP_SERVICIOS,
	DISABLE_UPDATE_SERVICIO,
	ENABLE_UPDATE_SERVICIO,
} from '../actions/serviciosActions';

const initialState = {
	status:{
		serviciosStatus:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		}
	},
	servicios: [],
	serviciosBackup: [],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case DISABLE_UPDATE_SERVICIO:
			return{
				...state,
				servicios: state.servicios.map(s => s.id == action.payload.id ? {...s, update: false} : s),
			}
		case ENABLE_UPDATE_SERVICIO:
			return{
				...state,
				servicios: state.servicios.map(s => s.id == action.payload.id ? {...s, update: true} : s),
			}
		case BACKUP_SERVICIOS:
			return{
				...state,
				serviciosBackup: state.servicios,
			}
		case RESTORE_SERVICIO_TO_SERVICIO:
			let serv =  state.serviciosBackup.find(s => s.id == action.payload.id);
			return{
				...state,
				servicios: state.servicios.map(s => s.id == action.payload.id ?
								{ ...s, servicio: serv.servicio }
								: s),
			}
		case UPDATE_SERVICIO_TO_SERVICIO:
			return{
				...state,
				servicios: state.servicios.map(s => s.id == action.payload.id ?
								{
									...s,
									servicio: action.payload.servicio,
								}
								: s),
			}
		case DISABLE_EDIT_SERVICIO:
			return{
				...state,
				servicios: state.servicios.map(s => s.id == action.payload.id ? {...s, edit: false} : s),
			}
		case ENABLE_EDIT_SERVICIO:
			return{
				...state,
				servicios: state.servicios.map(s => s.id == action.payload.id ? {...s, edit: true} : s),
			}
		case START_FETCH_SERVICIOS:
			return{
				...state,
				status:{
					...state.status,
					serviciosStatus:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		case SET_SERVICIOS:
			return{
				...state,
				servicios: action.payload.servicios.length == 0 ? [] :
								action.payload.servicios.map(s => ({...s, edit: false, update: false})),
				serviciosBackup: action.payload.servicios.length == 0 ? [] :
										action.payload.servicios.map(s => ({...s, edit: false, update: false})),
			}
		case FINISH_FETCH_SERVICIOS_SUCCESS:
			return{
				...state,
				status:{
					...state.status,
					serviciosStatus:{
						...state.status.serviciosStatus,
						start: false,
						finish: true,
						success: true,
					}
				}
			}
		case FINISH_FETCH_SERVICIOS_FAIL:
			return{
				...state,
				status:{
					...state.status,
					serviciosStatus:{
						...state.status.serviciosStatus,
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
