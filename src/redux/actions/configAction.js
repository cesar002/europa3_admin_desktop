export const START_FETCH_OFICINA_SIZES = 'START_FETCH_OFICINA_SIZES';
export const SET_OFICINAS_SIZES = 'SET_OFICINAS_SIZES';
export const FINISH_FETCH_OFICINA_SIZES_SUCCESS = 'FINISH_FETCH_OFICINA_SIZES_SUCCESS';
export const FINISH_FETCH_OFICINA_SIZES_FAIL = 'FINISH_FETCH_OFICINA_SIZES_FAIL';
export const START_FETCH_CAT_TIEMPOS_RENTA = 'START_FETCH_CAT_TIEMPOS_RENTA';
export const SET_CAT_TIEMPOS_RENTA = 'SET_CAT_TIEMPOS_RENTA';
export const FINISH_FETCH_CAT_TIEMPO_RENTA_SUCCESS = 'FINISH_FETCH_CAT_TIEMPO_RENTA_SUCCESS';
export const FINISH_FETCH_CAT_TIEMPO_RENTA_FAIL = 'FINISH_FETCH_CAT_TIEMPO_RENTA_FAIL';


export const startFetchCatTiemposRenta = () => ({
	type: START_FETCH_CAT_TIEMPOS_RENTA,
})

export const setCatTiemposRenta = tipos => ({
	type: SET_CAT_TIEMPOS_RENTA,
	payload: { tipos },
})

export const finishFetchCatTiempoRentaSuccess = () => ({
	type: FINISH_FETCH_CAT_TIEMPO_RENTA_SUCCESS,
})

export const finishFetchCatTiempoRentaFail = () => ({
	type: FINISH_FETCH_CAT_TIEMPO_RENTA_FAIL,
})

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
