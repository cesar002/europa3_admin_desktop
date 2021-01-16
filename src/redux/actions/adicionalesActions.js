export const START_FETCH_ADICIONALES = 'START_FETCH_ADICIONALES';
export const FINISH_FETCH_ADICIONALES_SUCCESS = 'FINISH_FETCH_ADICIONALES_SUCCESS';
export const FINISH_FETCH_ADICIONALES_FAIL = 'FINISH_FETCH_ADICIONALES_FAIL';
export const SET_ADICIONALES = 'SET_ADICIONALES';

export const START_FETCH_CAT_UNIDADES_ADICIONALES = 'START_FETCH_CAT_UNIDADES_ADICIONALES';
export const FINISH_FETCH_CAT_UNIDADES_ADICIONALES_SUCCESS = 'FINISH_FETCH_CAT_UNIDADES_ADICIONALES_SUCCESS';
export const FINISH_FETCH_CAT_UNIDADES_ADICIONALES_FAIL = 'FINISH_FETCH_CAT_UNIDADES_ADICIONALES_FAIL';
export const SET_CAT_UNIDADES_ADICIONALES = 'SET_CAT_UNIDADES_ADICIONALES';

export const SELECT_ADICIONAL = 'SELECT_ADICIONAL';
export const CLEAR_SELECTED_ADICIONAL = 'CLEAR_SELECTED_ADICIONAL';


export const selectAdicional = id => ({
	type: SELECT_ADICIONAL,
	payload: { id },
})

export const clearSelectedAdicional = () => ({
	type: { CLEAR_SELECTED_ADICIONAL }
})

export const startFetchCatUnidadesAdicionales = () => ({
	type: START_FETCH_CAT_UNIDADES_ADICIONALES,
})

export const finishFetchCatUnidadesAdicionalesSuccess = () => ({
	type: FINISH_FETCH_CAT_UNIDADES_ADICIONALES_SUCCESS,
})

export const finishFetchCatUnidadesAdicionalesFail = () => ({
	type: FINISH_FETCH_CAT_UNIDADES_ADICIONALES_FAIL,
})

export const setCatUnidadesAdicionales = unidades => ({
	type: SET_CAT_UNIDADES_ADICIONALES,
	payload: { unidades }
})

export const startFetchAdicionales = () => ({
	type: START_FETCH_ADICIONALES,
})

export const finishFetchAdicionalesSuccess = () => ({
	type: FINISH_FETCH_ADICIONALES_SUCCESS,
})

export const finishFetchAdicionalesFail = () => ({
	type: FINISH_FETCH_ADICIONALES_FAIL,
})

export const setAdicionales = adicionales => ({
	type: SET_ADICIONALES,
	payload: { adicionales }
})
