export const START_FETCH_OFICINA_SIZES = 'START_FETCH_OFICINA_SIZES';
export const SET_OFICINAS_SIZES = 'SET_OFICINAS_SIZES';
export const FINISH_FETCH_OFICINA_SIZES_SUCCESS = 'FINISH_FETCH_OFICINA_SIZES_SUCCESS';
export const FINISH_FETCH_OFICINA_SIZES_FAIL = 'FINISH_FETCH_OFICINA_SIZES_FAIL';


export const startFetchOficinasSizes = () => ({
	type: START_FETCH_OFICINA_SIZES,
})

export const setOficinasSizes = sizes => ({
	type: SET_OFICINAS_SIZES,
	payload: { sizes },
})

export const finishFetchOficinaSizesSuccess = () => ({
	type: FINISH_FETCH_OFICINA_SIZES_SUCCESS,
})

export const finishFetchOficinaSizesFail = () => ({
	type: FINISH_FETCH_OFICINA_SIZES_FAIL,
})
