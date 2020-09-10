export const START_FETCH_EDIFICIOS = 'START_FETCH_EDIFICIOS';
export const SET_EDIFICIOS = 'SET_EDIFICIOS';
export const FINISH_FETCH_EDIFICIOS_SUCCESS = 'FINISH_FETCH_EDIFICIOS_SUCCESS';
export const FINISH_FETCH_EDIFICIOS_FAIL = 'FINISH_FETCH_EDIFICIOS_FAIL';
export const SET_FETCH_EDIFICIOS_ERROR = 'SET_FETCH_EDIFICIOS_ERROR';

export const START_FETCH_REGISTER_EDIFICIO = 'START_FETCH_REGISTER_EDIFICIO'
export const FINISH_FETCH_REGISTER_EDIFICIO_SUCCESS = 'FINISH_FETCH_REGISTER_EDIFICIO_SUCCESS'
export const FINISH_FETCH_REGISTER_EDIFICIO_FAIL = 'FINISH_FETCH_REGISTER_EDIFICIO_FAIL'
export const SET_REGISTER_EDIFICIO_ERROR = 'SET_REGISTER_EDIFICIO_ERROR'


export const setRegisterEdificioError = error => ({
	type: SET_REGISTER_EDIFICIO_ERROR,
	payload: { error }
})

export const startFetchRegisterEdificio = data => ({
	type: START_FETCH_REGISTER_EDIFICIO,
	payload: { data }
})

export const finishFetchRegisterEdificioSuccess = () => ({
	type: FINISH_FETCH_REGISTER_EDIFICIO_SUCCESS
})

export const finishFetchRegisterEdificioFail = () => ({
	type: FINISH_FETCH_REGISTER_EDIFICIO_FAIL
})

export const startFetchEdificios = () => ({
	type: START_FETCH_EDIFICIOS,
})

export const  setEdificios = edificios => ({
	type: SET_EDIFICIOS,
	payload: { edificios }
})

export const finishFetchEdificiosSuccess = () => ({
	type: FINISH_FETCH_EDIFICIOS_SUCCESS,
})

export const finishFetchEdificiosFail = () => ({
	type: FINISH_FETCH_EDIFICIOS_FAIL,
})

export const setFetchEdificiosError = error => ({
	type: SET_FETCH_EDIFICIOS_ERROR,
	payload: { error }
})
