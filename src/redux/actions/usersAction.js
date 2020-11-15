export const START_FETCH_USERS = 'START_FETCH_USERS';
export const SET_USERS = 'SET_USERS';
export const FINISH_FETCH_USERS_SUCCESS = 'FINISH_FETCH_USERS_SUCCESS';
export const FINISH_FETCH_USERS_FAIL = 'FINISH_FETCH_USERS_FAIL';
export const SEARCH_USER = 'SEARCH_USER';


export const startFetchUsers = () => ({
	type: START_FETCH_USERS,
})

export const setUsers = users => ({
	type: SET_USERS,
	payload: { users }
})

export const finishFetchUsersSuccess = () => ({
	type: FINISH_FETCH_USERS_SUCCESS,
})

export const finishFetchUsersFail = () => ({
	type: FINISH_FETCH_USERS_FAIL,
})

export const searchUser = word => ({
	type: SEARCH_USER,
	payload: { word }
})
