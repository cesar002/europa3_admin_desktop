export const START_FETCH_OFICINAS = 'START_FETCH_OFICINAS'
export const FINISH_FETCH_OFICINAS_SUCCESS = 'FINISH_FETCH_OFICINAS_SUCCESS';
export const FINISH_FETCH_OFICINAS_FAIL = 'FINISH_FETCH_OFICINAS_FAIL';
export const START_FETCH_OFICINAS_BY_EDIFICIO_ID = 'START_FETCH_OFICINAS_BY_EDIFICIO_ID';
export const SET_OFICINAS = 'SET_OFICINAS';
export const FIND_OFICINA_BY_ID = 'FIND_OFICINA_BY_ID';
export const FILTER_OFICINA_BY_EDIFICIO_ID = 'FILTER_OFICINA_BY_EDIFICIO_ID';


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
