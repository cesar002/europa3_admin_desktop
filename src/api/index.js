import axios from './customAxios'
import LocalStorage from '../services/UserCredencialsStorageService'

import {
	LOGIN,
	INFO_PERSONAL,
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

			LocalStorage.setCredentials(loginData.data.access_token)

			return {
				status: 'success',
				data: loginData.data.access_token,
			};
		} catch (error) {
			return {
				status: 'error',
				data: error.response.data,
			};
		}
	}

	/**
	 *
	 * Retorna la información del usuario autenticado
	 *
	 * @param {string} accessToken
	 *
	 * @returns {object} { status: success | error, data }
	 */
	static async getUserData(accessToken){
		try {
			const userData = await axios.get(INFO_PERSONAL, {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			});

			return {
				status: 'success',
				data: userData.data,
			}
		} catch (error) {
			return{
				status: 'error',
				data: error.response.data,
			}
		}
	}

}


export default Europa3Api;
