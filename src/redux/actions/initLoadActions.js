export const START_FETCH_SYSTEM_DATA = 'START_FETCH_SYSTEM_DATA';
export const START_INIT_AUTO_LOGIN = 'START_INIT_AUTO_LOGIN';
export const START_INIT_ALL = 'START_INIT_ALL';

export const startFetchSystemData = () => ({
	type: START_FETCH_SYSTEM_DATA,
})

export const startAutoLogin = () => ({
	type: START_INIT_AUTO_LOGIN,
})

export const startInitAll = () => ({
	type: START_INIT_ALL,
})
