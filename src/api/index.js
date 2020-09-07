import axios from './customAxios'

import {
	LOGIN
} from './URLS'

class Europa3Api {

	/**
	 * Realiza la petición al servidor para relizar el login del usuario
	 *
	 * @param {string} username
	 * @param {string} password
	 *
	 * @returns {object} { status: success | error, data }
	 */
	static async login(username, password) {
		try {
			const loginData = await axios.post(LOGIN, {
				username,
				password
			})

			console.log(loginData.data);

			return {
				status: 'success',
				data: loginData.data,
			};
		} catch (error) {
			return {
				status: 'error',
				data: error.response.data,
			};
		}
	}

}


export default Europa3Api;
