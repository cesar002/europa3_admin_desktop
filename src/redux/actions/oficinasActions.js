export const START_FETCH_OFICINAS = 'START_FETCH_OFICINAS'
export const FINISH_FETCH_OFICINAS_SUCCESS = 'FINISH_FETCH_OFICINAS_SUCCESS';
export const FINISH_FETCH_OFICINAS_FAIL = 'FINISH_FETCH_OFICINAS_FAIL';
export const START_FETCH_OFICINAS_BY_EDIFICIO_ID = 'START_FETCH_OFICINAS_BY_EDIFICIO_ID';
export const SET_OFICINAS = 'SET_OFICINAS';
export const FIND_OFICINA_BY_ID = 'FIND_OFICINA_BY_ID';
export const FILTER_OFICINA_BY_EDIFICIO_ID = 'FILTER_OFICINA_BY_EDIFICIO_ID';
export const UPDATE_CANTIDAD_MOBILIARIO_TO_OFICINA_UPDATE = 'UPDATE_CANTIDAD_MOBILIARIO_TO_OFICINA_UPDATE';
export const DELETE_MOBILIARIO_TO_OFICINA_UPDATE = 'DELETE_MOBILIARIO_TO_OFICINA_UPDATE';
export const ADD_MOBILIARIO_TO_OFICINA_UPDATE = 'ADD_MOBILIARIO_TO_OFICINA_UPDATE';
export const DELETE_SERVICIO_TO_OFICINA_UPDATE = 'DELETE_SERVICIO_TO_OFICINA_UPDATE';
export const ADD_SERVICIO_TO_OFICINA_UPDATE = 'ADD_SERVICIO_TO_OFICINA_UPDATE';
export const DELETE_IMAGE_TO_OFICINA_UPDATE = 'DELETE_IMAGE_TO_OFICINA_UPDATE';
export const START_FETCH_IMAGES_OFICINA = 'START_FETCH_IMAGES_OFICINA';
export const FINISH_FETCH_IMAGES_OFICINA_SUCCESS = 'FINISH_FETCH_IMAGES_OFICINA_SUCCESS';
export const FINISH_FETCH_IMAGES_OFICINA_FAIL = 'FINISH_FETCH_IMAGES_OFICINA_FAIL';
export const UPDATE_IMAGE_OFICINA_SELECTED = 'UPDATE_IMAGE_OFICINA_SELECTED'




export const startFetchImagesOficina = id => ({
	type: START_FETCH_IMAGES_OFICINA,
	payload: { id }
})

export const finishFetchImagesOficinaSuccess = () => ({
	type: FINISH_FETCH_IMAGES_OFICINA_SUCCESS,
})

export const finishFetchImagesOficinaFail = () => ({
	type: FINISH_FETCH_IMAGES_OFICINA_FAIL
})

export const updateImagesOficinaSelected = images => ({
	type: UPDATE_IMAGE_OFICINA_SELECTED,
	payload: { images }
})

export const deleteImageToOficinaUpdate = id => ({
	type: DELETE_IMAGE_TO_OFICINA_UPDATE,
	payload: { id }
})

export const addServicioToOficinaUpdate = servicio => ({
	type: ADD_SERVICIO_TO_OFICINA_UPDATE,
	payload: { servicio }
})

export const deleteServiciotoOficinaUpdate = id => ({
	type: DELETE_SERVICIO_TO_OFICINA_UPDATE,
	payload: { id }
})

export const addMobiliarioToOficinaUpdate = ( mobiliario ) => ({
	type: ADD_MOBILIARIO_TO_OFICINA_UPDATE,
	payload: { mobiliario }
})


export const deleteMobiliarioToOficinaUpdate = id => ({
	type: DELETE_MOBILIARIO_TO_OFICINA_UPDATE,
	payload: { id }
})

export const updateCantidadMobiliarioToOficinaUpdate = (mobiliarioId, cantidad) => ({
	type: UPDATE_CANTIDAD_MOBILIARIO_TO_OFICINA_UPDATE,
	payload: { mobiliarioId, cantidad },
})

export const startFetchOficinas = () => ({
	type: START_FETCH_OFICINAS,
})

export const startFetchOficinaByEdificioId = (id) => ({
	type: START_FETCH_OFICINAS_BY_EDIFICIO_ID,
	payload: { id }
})

export const setOficinas = oficinas => ({
	type: SET_OFICINAS,
	payload: { oficinas }
})

export const finishFetchOficinasSuccess = () => ({
	type: FINISH_FETCH_OFICINAS_SUCCESS,
})

export const finishFetchOficinasFail = () => ({
	type: FINISH_FETCH_OFICINAS_FAIL,
})

export const findOficinaById = id => ({
	type: FIND_OFICINA_BY_ID,
	payload: { id }
})

export const filterOficinaByEdificioId = id => ({
	type: FILTER_OFICINA_BY_EDIFICIO_ID,
	payload: { id }
})
