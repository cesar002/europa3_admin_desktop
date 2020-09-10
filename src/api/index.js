import axios from './customAxios'
import LocalStorage from '../services/UserCredencialsStorageService'

import {
	LOGIN,
	INFO_PERSONAL,
	EDIFICIO,
	EDIFICIOS,
	REGISTER_EDIFICIO,
	MUNICIPIOS,
	ESTADOS,
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

	/**
	 * Obtiene todos los edificios que se encuentren registrados
	 *
	 * @returns {object} { status: success|error, data }
	 */
	static async getEdificios(){
		try {
			const edificiosData = await axios.get(EDIFICIOS);

			return{
				status: 'success',
				data: edificiosData.data,
			}
		} catch (error) {
			return{
				status: 'error',
				data: error.response.data,
			}
		}
	}

	/**
	 * Obtiene un edificio por ID
	 *
	 * @param {number} id
	 *
	 * @returns {object} { status: success|error, data }
	 */
	static async getEdificioById(id){
		try {
			const edificioData = await axios.get(`${EDIFICIO}/${id}`);

			return {
				stauts: 'success',
				data: edificioData.data,
			}
		} catch (error) {
			return{
				status: 'error',
				data: error.response.data,
			}
		}
	}

	/**
	 * Retorna los estados de la republica mexicana
	 *
	 * @returns {object} { status: success|error, data }
	 */
	static async getEstados(){
		try {
			const estados = await axios.get(ESTADOS);

			return{
				status: 'success',
				data: estados.data,
			}
		} catch (error) {

			console.log(error.response.data)
			return{
				status: 'error',
				data: error.response.data,
			}
		}
	}


	/**
	 * Obtiene los municipios según el ID del estado
	 *
	 * @param {number} id
	 *
	 * @returns {object} { status: success|error, data }
	 */
	static async getMunicipiosByEstadoId(id){
		try {
			const municipios = await axios.get(`${MUNICIPIOS}/${id}`);

			return{
				status: 'success',
				data: municipios.data,
			}
		} catch (error) {
			return{
				status: 'error',
				data: error.response.data,
			}
		}
	}

	/*
	   "nombre" : "europa 3 cede",
		"direccion" : "bulevar esquina avenida moscu",
		"municipio_id" : 2174,
		"telefono" : 5873928394,
		"telefono_recepcion"  : 8738729,
		"hora_apertura" : "09:00",
		"hora_cierre" : "22:00"
	*/
	static async registerEdificio(data){
		try {
			const resp = await axios.post(REGISTER_EDIFICIO, {
				...data
			});

			return {
				status: 'success',
				data: resp.data
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
