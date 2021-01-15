export const START_FETCH_OFICINAS_VIRTUALES = 'START_FETCH_OFICINAS_VIRTUALES';
export const FINISH_FETCH_OFICINAS_VIRTUALES_SUCCESS = 'FINISH_FETCH_OFICINAS_VIRTUALES_SUCCESS';
export const FINISH_FETCH_OFICINAS_VIRTUALES_FAIL = 'FINISH_FETCH_OFICINAS_VIRTUALES_FAIL';
export const SET_OFICINAS_VIRTUALES = 'SET_OFICINAS_VIRTUALES';
export const SELECT_OFICINA_VIRTUAL = 'SELECT_OFICINA_VIRTUAL';
export const CLEAR_OFICINA_VIRTUAL_SELECTED = 'CLEAR_OFICINA_VIRTUAL_SELECTED';

export const selectOficinaVirtual = id => ({
	type: SELECT_OFICINA_VIRTUAL,
	payload: { id }
})

export const clearOficinaVirtualSelected = () => ({
	type: CLEAR_OFICINA_VIRTUAL_SELECTED,
})

export const startFetchOficinasVirtuales = () => ({
	type: START_FETCH_OFICINAS_VIRTUALES,
})

export const finishFetchOficinasVirtualesSuccess = () => ({
	type: FINISH_FETCH_OFICINAS_VIRTUALES_SUCCESS,
})

export const finishFetchOficinasVirtualesFail = () => ({
	type: FINISH_FETCH_OFICINAS_VIRTUALES_FAIL,
})

export const setOficinasVirtuales = oficinas => ({
	type: SET_OFICINAS_VIRTUALES,
	payload: { oficinas },
})
