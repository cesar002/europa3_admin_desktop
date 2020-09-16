export const START_FETCH_MOBILIARIO = 'START_FETCH_MOBILIARIO';
export const SET_MOBILIARIO = 'SET_MOBILIARIO';
export const FINISH_FETCH_MOBILIARIO_SUCCESS = 'FINISH_FETCH_MOBILIARIO_SUCCESS';
export const FINISH_FETCH_MOBILIARIO_FAIL = 'FINISH_FETCH_MOBILIARIO_FAIL';


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
