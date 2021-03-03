export const START_FETCH_USUARIOS_ADMIN = 'START_FETCH_USUARIOS_ADMIN';
export const FINISH_FETCH_USUARIOS_ADMIN_SUCCESS = 'FINISH_FETCH_USUARIOS_ADMIN_SUCCESS';
export const FINISH_FETCH_USUARIOS_ADMIN_FAIL = 'FINISH_FETCH_USUARIOS_ADMIN_FAIL';
export const SET_USUARIOS_ADMIN = 'SET_USUARIOS_ADMIN';


export const startFetchUsuariosAdmin = () => ({
	type: START_FETCH_USUARIOS_ADMIN,
})

export const finishFetchUsuariosAdminSuccess = () => ({
	type: FINISH_FETCH_USUARIOS_ADMIN_SUCCESS,
})

export const finishFetchUsuariosAdminFail = () => ({
	type: FINISH_FETCH_USUARIOS_ADMIN_FAIL,
})

export const setUsuariosAdmin = usuarios => ({
	type: SET_USUARIOS_ADMIN,
	payload: { usuarios },
})
