export const START_FETCH_SERVICIOS = 'START_FETCH_SERVICIOS';
export const SET_SERVICIOS = 'SET_SERVICIOS';
export const FINISH_FETCH_SERVICIOS_SUCCESS = 'FINISH_FETCH_SERVICIOS_SUCCESS';
export const FINISH_FETCH_SERVICIOS_FAIL = 'FINISH_FETCH_SERVICIOS_FAIL';
export const ENABLE_EDIT_SERVICIO = 'ENABLE_EDIT_SERVICIO';
export const DISABLE_EDIT_SERVICIO = 'DISABLE_EDIT_SERVICIO';
export const UPDATE_SERVICIO_TO_SERVICIO = 'UPDATE_SERVICIO_TO_SERVICIO';
export const RESTORE_SERVICIO_TO_SERVICIO = 'RESTORE_SERVICIO_TO_SERVICIO';
export const BACKUP_SERVICIOS = 'BACKUP_SERVICIOS';
export const ENABLE_UPDATE_SERVICIO  = 'ENABLE_UPDATE_SERVICIO';
export const DISABLE_UPDATE_SERVICIO = 'DISABLE_UPDATE_SERVICIO';


export const enableUpdateServicio = id => ({
	type: ENABLE_UPDATE_SERVICIO,
	payload: { id },
})

export const diableUpdateServicio = id => ({
	type: DISABLE_UPDATE_SERVICIO,
	payload: { id },
})

export const backupServicios = () => ({
	type: BACKUP_SERVICIOS,
})

export const restoreServicioToServicio = id => ({
	type: RESTORE_SERVICIO_TO_SERVICIO,
	payload: { id }
});

export const updateServicioToServicio = (id, servicio) => ({
	type: UPDATE_SERVICIO_TO_SERVICIO,
	payload: { id, servicio },
})

export const enableEditServicio = id => ({
	type: ENABLE_EDIT_SERVICIO,
	payload: { id }
})

export const disableEditServicio = id => ({
	type: DISABLE_EDIT_SERVICIO,
	payload: { id }
})

export const startFetchServicios = () => ({
	type: START_FETCH_SERVICIOS,
})

export const setServicios = servicios => ({
	type: SET_SERVICIOS,
	payload: { servicios }
})

export const finishFetchServiciosSuccess = () => ({
	type: FINISH_FETCH_SERVICIOS_SUCCESS,
})

export const finishFetchServiciosFail= () => ({
	type: FINISH_FETCH_SERVICIOS_FAIL,
})
