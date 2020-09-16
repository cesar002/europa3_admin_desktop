export const START_FETCH_MOBILIARIO = 'START_FETCH_MOBILIARIO';
export const SET_MOBILIARIO = 'SET_MOBILIARIO';
export const FINISH_FETCH_MOBILIARIO_SUCCESS = 'FINISH_FETCH_MOBILIARIO_SUCCESS';
export const FINISH_FETCH_MOBILIARIO_FAIL = 'FINISH_FETCH_MOBILIARIO_FAIL';

export const START_FETCH_TIPO_MOBILIARIO = 'START_FETCH_TIPO_MOBILIARIO';
export const SET_TIPO_MOBILIARIO = 'SET_TIPO_MOBILIARIO';
export const FINISH_FETCH_TIPO_MOBILIARIO_SUCCESS = 'FINISH_FETCH_TIPO_MOBILIARIO_SUCCESS';
export const FINISH_FETCH_TIPO_MOBILIARIO_FAIL = 'FINISH_FETCH_TIPO_MOBILIARIO_FAIL';


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
