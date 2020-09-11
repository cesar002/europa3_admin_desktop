import axios from './customAxios'
import LocalStorage from '../services/UserCredencialsStorageService'

import {
	LOGIN,
	INFO_PERSONAL,
	EDIFICIO,
	EDIFICIOS,
	REGISTER_EDIFICIO,
	UPDATE_EDIFICIO,
	MUNICIPIOS,
	ESTADOS,
	OFICINAS_ALL,
	OFICINAS_EDIFICIO,
	GET_OFICINAS_SIZE,
	REGISTER_OFICINA,
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

	/**
	 *
	 * Registra un edificio
	 *
	 * @param {object} data
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

	/**
	 *
	 * Actualiza un edificio dado su ID
	 *
	 * @param {object} data
	 * @param {number} id
	 */
	static async updateEdificio(data, id){
		try {
			const resp = await axios.put(`${UPDATE_EDIFICIO}/${id}`, {
				...data,
			})

			return {
				status: 'success',
				data: resp.data,
			}
		} catch (error) {
			return{
				status: 'error',
				data: error.response.data,
			}
		}
	}

	/**
	 * Obtiene las oficinas según el id del edificio
	 *
	 * @param {number} idEdificio
	 */
	static async getOficinasByEdificioId(idEdificio){
		try {
			const resp = await axios.get(`${OFICINAS_EDIFICIO}/${idEdificio}`);

			return {
				status: 'success',
				data: resp.data,
			}
		} catch (error) {
			return {
				status: 'error',
				data: error.response.data,
			}
		}
	}

	/**
	 *Retorna todas las oficinas
	 */
	static async getOficinas(){
		try {
			const resp = await axios.get(OFICINAS_ALL);

			return {
				status: 'success',
				data: resp.data,
			}
		} catch (error) {

			return{
				status: 'error',
				data: error.response.data,
			}
		}
	}

	/**
	 * Obtiene los tamaños del catalogo de tamaños de oficinas
	 */
	static async getSizesOficinas(){
		try {
			const resp = await axios.get(GET_OFICINAS_SIZE);

			return{
				status: 'success',
				data: resp.data,
			}
		} catch (error) {
			return {
				status: 'error',
				data: error.response.data,
			}
		}
	}


	/**
	 *
	 * @param {object} data
	 */
	static async registerOficina(data){
		try {
			const resp = await axios.post(REGISTER_OFICINA, {
				...data
			})

			console.log(resp.data)

			return{
				status: 'success',
				data: resp.data,
			}
		} catch (error) {
			console.error(error)
			return{
				status: 'error',
				data: error.response.data
			}
		}
	}

}


export default Europa3Api;
