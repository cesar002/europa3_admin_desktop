export const START_FETCH_IDIOMAS_ATENCION = 'START_FETCH_IDIOMAS_ATENCION';
export const SET_IDIOMAS_ATENCION = 'SET_IDIOMAS_ATENCION';
export const FINISH_FETCH_IDIOMAS_ATENCION_SUCCESS = 'FINISH_FETCH_IDIOMAS_ATENCION_SUCCESS';
export const FINISH_FETCH_IDIOMAS_ATENCION_FAIL = 'FINISH_FETCH_IDIOMAS_ATENCION_FAIL';
export const ENABLE_EDIT_IDIOMA = 'ENABLE_EDIT_IDIOMA';
export const DISABLE_EDIT_IDIOMA = 'DISABLE_EDIT_IDIOMA';
export const UPDATE_IDIOMA_TO_IDIOMAS = 'UPDATE_IDIOMA_TO_IDIOMAS';
export const RESTORE_IDIOMA_TO_IDIOMAS = 'RESTORE_IDIOMA_TO_IDIOMAS';
export const BACKUP_IDIOMAS = 'BACKUP_IDIOMAS';
export const ENABLE_UPDATE_IDIOMA  = 'ENABLE_UPDATE_IDIOMA';
export const DISABLE_UPDATE_IDIOMA = 'DISABLE_UPDATE_IDIOMA';



export const enableEditIdioma = id => ({
	type: ENABLE_EDIT_IDIOMA,
	payload: { id },
})

export const disableEditIdioma = id => ({
	type: DISABLE_EDIT_IDIOMA,
	payload: { id },
})

export const updateIdiomaToIdiomas = (id, idioma) => ({
	type: UPDATE_IDIOMA_TO_IDIOMAS,
	payload: { id, idioma }
})

export const restoreIdiomaToIdiomas = id => ({
	type: RESTORE_IDIOMA_TO_IDIOMAS,
	payload: { id }
})

export const backupIdiomas = () => ({
	type: BACKUP_IDIOMAS,
})

export const enableUpdateIdioma = id => ({
	type: ENABLE_UPDATE_IDIOMA,
	payload: { id },
})

export const disableUpdateIdioma = id => ({
	type: DISABLE_UPDATE_IDIOMA,
	payload: { id }
})

export const startFetchIdiomasAtencion = () => ({
	type: START_FETCH_IDIOMAS_ATENCION,
})

export const setIdiomasAtencion = idiomas => ({
	type: SET_IDIOMAS_ATENCION,
	payload: { idiomas },
})

export const finishFetchIdiomasAtencionSuccess = () => ({
	type: FINISH_FETCH_IDIOMAS_ATENCION_SUCCESS,
})

export const finishFetchIdiomasAtencionFail = () => ({
	type: FINISH_FETCH_IDIOMAS_ATENCION_FAIL,
})
