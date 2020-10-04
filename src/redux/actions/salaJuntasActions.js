export const START_FETCH_SALA_JUNTAS = 'START_FETCH_SALA_JUNTAS';
export const SET_SALA_JUNTAS = 'SET_SALA_JUNTAS';
export const FINISH_FETCH_SALA_JUNTAS_SUCCESS = 'FINISH_FETCH_SALA_JUNTAS_SUCCESS';
export const FINISH_FETCH_SALA_JUNTAS_FAIL = 'FINISH_FETCH_SALA_JUNTAS_FAIL';
export const SELECT_SALA_JUNTAS = 'SELECT_SALA_JUNTAS';
export const FILTER_SALA_JUNTAS_BY_EDIFICIO_ID = 'FILTER_SALA_JUNTAS_BY_EDIFICIO_ID';


export const startFetchSalaJuntas = () => ({
	type: START_FETCH_SALA_JUNTAS,
})

export const setSalaJuntas = salaJuntas => ({
	type: SET_SALA_JUNTAS,
	payload: { salaJuntas }
})

export const finishFetchSalaJuntasSuccess = () => ({
	type: FINISH_FETCH_SALA_JUNTAS_SUCCESS,
})

export const finishFetchSalaJuntasFail = () => ({
	type: FINISH_FETCH_SALA_JUNTAS_FAIL,
})

export const selectSalaJuntas = id => ({
	type: SELECT_SALA_JUNTAS,
	payload: { id }
})

export const filterSalaJuntasByEdificioId = id => ({
	type: FILTER_SALA_JUNTAS_BY_EDIFICIO_ID,
	payload: { id }
})
