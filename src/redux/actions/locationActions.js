export const START_FETCH_ESTADOS = 'START_FETCH_ESTADOS';
export const SET_ESTADOS = 'SET_ESTADOS';
export const FINISH_FETCH_ESTADOS_SUCCESS = 'FINISH_FETCH_ESTADOS_SUCCESS';
export const FINISH_FETCH_ESTADOS_FAIL = 'FINISH_FETCH_ESTADOS_FAIL';

export const START_FETCH_MUNICIPIOS = 'START_FETCH_MUNICIPIOS';
export const SET_MUNICIPIOS = 'SET_MUNICIPIOS';
export const FINISH_FETCH_MUNICIPIOS_SUCCESS = 'FINISH_FETCH_MUNICIPIOS_SUCCESS';
export const FINISH_FETCH_MUNICIPIOS_FAIL = 'FINISH_FETCH_MUNICIPIOS_FAIL';

export const START_FETCH_LOCALIDADES = 'START_FETCH_LOCALIDADES';
export const SET_LOCALIDADES = 'SET_LOCALIDADES';
export const FINISH_FETCH_LOCALIDADES_SUCCESS = 'FINISH_FETCH_LOCALIDADES_SUCCESS';
export const FINISH_FETCH_LOCALIDADES_FAIL = 'FINISH_FETCH_LOCALIDADES_FAIL';


export const startFetchLocalidades = () => ({
	type: START_FETCH_LOCALIDADES,
})

export const setLocalidades = localidades => ({
	type: SET_LOCALIDADES,
	payload: { localidades }
})

export const finishFetchLocalidadesSuccess = () => ({
	type: FINISH_FETCH_LOCALIDADES_SUCCESS,
})

export const finishFetchLocalidadesFail = () => ({
	type: FINISH_FETCH_LOCALIDADES_FAIL,
})

export const startFetchMunicipios = (id) => ({
	type: START_FETCH_MUNICIPIOS,
	payload: { id }
})

export const setMunicipios = municipios => ({
	type: SET_MUNICIPIOS,
	payload: { municipios }
})

export const finishFetchMunicipiosSuccess = () => ({
	type: FINISH_FETCH_MUNICIPIOS_SUCCESS,
})

export const finishFetchMunicipiosFail = () => ({
	type: FINISH_FETCH_MUNICIPIOS_FAIL,
})

export const startFetchEstados = () => ({
	type: START_FETCH_ESTADOS,
})

export const setEstados = estados => ({
	type: SET_ESTADOS,
	payload: { estados }
})

export const finishFetchEstadosSuccess = () => ({
	type: FINISH_FETCH_ESTADOS_SUCCESS,
})

export const finishFetchEstadosFail = () => ({
	type: FINISH_FETCH_ESTADOS_FAIL,
})
