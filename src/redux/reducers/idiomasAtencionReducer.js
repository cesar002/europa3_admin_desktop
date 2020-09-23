import {
	START_FETCH_IDIOMAS_ATENCION,
	SET_IDIOMAS_ATENCION,
	FINISH_FETCH_IDIOMAS_ATENCION_SUCCESS,
	FINISH_FETCH_IDIOMAS_ATENCION_FAIL,
	UPDATE_IDIOMA_TO_IDIOMAS,
	RESTORE_IDIOMA_TO_IDIOMAS,
	DISABLE_EDIT_IDIOMA,
	ENABLE_EDIT_IDIOMA,
	ENABLE_UPDATE_IDIOMA,
	DISABLE_UPDATE_IDIOMA,
	BACKUP_IDIOMAS,
} from '../actions/idiomasAtencionActions';


const initialState = {
	status: {
		idiomasStatus:{
			start: false,
			finish: false,
			success: false,
			fail: false,
		},
	},
	idiomasAtencion: [],
	idiomasAtencionBackup: [],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case BACKUP_IDIOMAS:
			return{
				...state,
				idiomasAtencionBackup: state.idiomasAtencion,
			}
		case DISABLE_UPDATE_IDIOMA:
			return{
				...state,
				idiomasAtencion: state.idiomasAtencion.map(i => i.id == action.payload.id ?
					{...i, update: false} : i)
			}
		case ENABLE_UPDATE_IDIOMA:
			return{
				...state,
				idiomasAtencion: state.idiomasAtencion.map(i => i.id == action.payload.id ?
					{...i, update: true} : i)
			}
		case ENABLE_EDIT_IDIOMA:
			return{
				...state,
				idiomasAtencion: state.idiomasAtencion.map(i => i.id == action.payload.id ?
					{...i, edit: true} : i)
			}
		case DISABLE_EDIT_IDIOMA:
			return{
				...state,
				idiomasAtencion: state.idiomasAtencion.map(i => i.id == action.payload.id ?
										{...i, edit: false} : i)
			}
		case RESTORE_IDIOMA_TO_IDIOMAS:
			let res = state.idiomasAtencionBackup.find(i => i.id == action.payload.id);
			return{
				...state,
				idiomasAtencion: state.idiomasAtencion.map(i => i.id == action.payload.id ?
										{...i, idioma: res.idioma} : i)
			}
		case UPDATE_IDIOMA_TO_IDIOMAS:
			return{
				...state,
				idiomasAtencion: state.idiomasAtencion.map(i => i.id == action.payload.id ?
										{...i, idioma: action.payload.idioma} : i),
			}
		case START_FETCH_IDIOMAS_ATENCION:
			return {
				...state,
				status:{
					...state.status,
					idiomasStatus:{
						start: true,
						finish: false,
						success: false,
						fail: false,
					}
				}
			}
		case SET_IDIOMAS_ATENCION:
			return{
				...state,
				idiomasAtencion: action.payload.idiomas.map(i => ({...i, edit: false, update: false})),
				idiomasAtencionBackup: action.payload.idiomas.map(i => ({...i, edit: false, update: false})),
			}
		case FINISH_FETCH_IDIOMAS_ATENCION_SUCCESS:
			return{
				...state,
				status:{
					...state.status,
					idiomasStatus:{
						...state.status.idiomasStatus,
						start: false,
						finish: true,
						success: true,
					}
				}
			}
		case FINISH_FETCH_IDIOMAS_ATENCION_FAIL:
			return{
				...state,
				status:{
					...state.status,
					idiomasStatus:{
						...state.status.idiomasStatus,
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
