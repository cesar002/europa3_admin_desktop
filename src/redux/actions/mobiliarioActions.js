export const START_FETCH_MOBILIARIO = 'START_FETCH_MOBILIARIO';
export const SET_MOBILIARIO = 'SET_MOBILIARIO';
export const FINISH_FETCH_MOBILIARIO_SUCCESS = 'FINISH_FETCH_MOBILIARIO_SUCCESS';
export const FINISH_FETCH_MOBILIARIO_FAIL = 'FINISH_FETCH_MOBILIARIO_FAIL';

export const START_FETCH_TIPO_MOBILIARIO = 'START_FETCH_TIPO_MOBILIARIO';
export const SET_TIPO_MOBILIARIO = 'SET_TIPO_MOBILIARIO';
export const FINISH_FETCH_TIPO_MOBILIARIO_SUCCESS = 'FINISH_FETCH_TIPO_MOBILIARIO_SUCCESS';
export const FINISH_FETCH_TIPO_MOBILIARIO_FAIL = 'FINISH_FETCH_TIPO_MOBILIARIO_FAIL';

export const START_FETCH_MOBILIARIO_BY_EDIFICIO_ID = 'START_FETCH_MOBILIARIO_BY_EDIFICIO_ID';
export const SET_MOBILIARIO_BY_EDIFICIO = 'SET_MOBILIARIO_BY_EDIFICIO';
export const FINISH_FETCH_MOBILIARIO_BY_EDIFICIO_ID_SUCCESS = 'FINISH_FETCH_MOBILIARIO_BY_EDIFICIO_ID_SUCCESS';
export const FINISH_FETCH_MOBILIARIO_BY_EDIFICIO_ID_FAIL = 'FINISH_FETCH_MOBILIARIO_BY_EDIFICIO_ID_FAIL';
export const ADD_MOBILIARIO_TO_MOBILIARIO_OFICINA = 'ADD_MOBILIARIO_TO_MOBILIARIO_OFICINA';

export const UPDATE_CANTIDAD_MOBILIARIO_TO_MOBILIARIO_OFICINA = 'UPDATE_CANTIDAD_MOBILIARIO_TO_MOBILIARIO_OFICINA';
export const DELETE_MOBILIARIO_IN_MOBILIARIO_OFICINA = 'DELETE_MOBILIARIO_IN_MOBILIARIO_OFICINA';
export const CLEAR_MOBILIARIO_OFICINA = 'CLEAR_MOBILIARIO_OFICINA'


export const clearMobiliarioOficina = () => ({
	type: CLEAR_MOBILIARIO_OFICINA,
})

export const deleteMobiliarioInMobiliarioOficina = id => ({
	type: DELETE_MOBILIARIO_IN_MOBILIARIO_OFICINA,
	payload: { id }
})

export const updateCantidadMobiliarioToMobiliarioOficina = (id, cantidad) => ({
	type: UPDATE_CANTIDAD_MOBILIARIO_TO_MOBILIARIO_OFICINA,
	payload: { id, cantidad }
})

export const addMobiliarioToMobiliarioOficina = id => ({
	type: ADD_MOBILIARIO_TO_MOBILIARIO_OFICINA,
	payload: { id }
})

export const startFetchMobiliarioByEdificioId = (edificioId) => ({
	type: START_FETCH_MOBILIARIO_BY_EDIFICIO_ID,
	payload: { edificioId }
})

export const setMobiliarioByEdificio = mobiliario => ({
	type: SET_MOBILIARIO_BY_EDIFICIO,
	payload: { mobiliario }
})

export const finishFetchMobiliarioByEdificioIdSuccess = () => ({
	type: FINISH_FETCH_MOBILIARIO_BY_EDIFICIO_ID_SUCCESS
})

export const finishFetchMobiliarioByEdificioIdFail = () => ({
	type: FINISH_FETCH_MOBILIARIO_BY_EDIFICIO_ID_FAIL
})

export const startFetchTipoMobiliario = () => ({
	type: START_FETCH_TIPO_MOBILIARIO,
})

export const setTipoMobiliario = tipo => ({
	type: SET_TIPO_MOBILIARIO,
	payload: { tipo },
})

export const finishFetchTipoMobiliarioSuccess = () => ({
	type: FINISH_FETCH_TIPO_MOBILIARIO_SUCCESS,
})

export const finishFetchTipoMobiliarioFail = () => ({
	type: FINISH_FETCH_TIPO_MOBILIARIO_FAIL,
})

export const startFetchMobiliario = () => ({
	type: START_FETCH_MOBILIARIO,
})

export const setMobiliario = mobiliario => ({
	type: SET_MOBILIARIO,
	payload: { mobiliario }
})

export const finishFetchMobiliarioSuccess = () => ({
	type: FINISH_FETCH_MOBILIARIO_SUCCESS,
})

export const finishFetchMobiliarioFail = () => ({
	type: FINISH_FETCH_MOBILIARIO_FAIL,
})
