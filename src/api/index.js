import axios from './customAxios'
import LocalStorage from '../services/UserCredencialsStorageService'

import {
	LOGIN,
	INFO_PERSONAL,
	GET_NOTIFICATIONS,
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
	REGISTER_MOBILIARIO,
	MOBILIARIO_ALL,
	GET_TIPO_MOBILIARIO,
	GET_MOBILIARIO_BY_EDIFICIO,
	GET_SERVICIOS,
	CREATE_SERVICIO,
	UPDATE_SERVICIO,
	GET_IDIOMAS_ATENCION,
	CREATE_IDIOMA_ATENCION,
	UPDATE_IDIOMA_ATENCION,
	UPDATE_IMAGES_OFICINA,
	GET_IMAGES_OFICINA,
	UPDATE_OFICINA,
	GET_SALAS_JUNTAS,
	GET_CAT_TIPOS_TIEMPOS_RENTA,
	REGISTER_SALA_JUNTAS,
	GET_IMAGES_SALA_JUNTAS,
	UPDATE_IMAGES_SALA_JUNTAS,
	UPDATE_SALA_JUNTAS,
	GET_USERS,
	DELETE_ALL_NOTIFICATIONS,
	DELETE_NOTIFICATION_BY_ID,
	GET_SOLICITUDES,
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
		return new Promise(async (resolve, reject)=>{
			try {
				const resp = await axios.post(REGISTER_OFICINA, data,{
					headers:{
						'Content-type' : 'multipart/form-data',
						'Accept' : 'application/json',
					}
				})


				return resolve({
					status: 'success',
					data: resp.data,
				})
			} catch (error) {
				return reject({
					status: 'error',
					data: error.response.data
				})
			}
		})
	}

	static async registerMobiliario(data){
		try {
			const resp = await axios.post(REGISTER_MOBILIARIO, data);

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

	static async getMobiliario(){
		try {
			const resp = await axios.get(MOBILIARIO_ALL);

			return{
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

	static async getTipoMobiliario(){
		try {
			const resp = await axios.get(GET_TIPO_MOBILIARIO);

			return{
				status: 'success',
				data: resp.data
			}
		} catch (error) {
			return{
				status: 'error',
				data: error.response.data
			}
		}
	}

	/**
	 *
	 * @param {number} edificioId
	 */
	static async getMobiliarioByEdificio(edificioId){
		try {
			const resp = await axios.get(`${GET_MOBILIARIO_BY_EDIFICIO}/${edificioId}`);

			return{
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


	static async getServicios(){
		return new Promise(async (resolve, reject)=>{
			try {
				const resp = await axios.get(GET_SERVICIOS);

				return resolve({
					status: 'success',
					data: resp.data,
				})
			} catch (error) {
				return reject({
					status: 'error',
					data: error.response.data,
				})
			}
		})
	}

	/**
	 *
	 * @param {string} nombre
	 */
	static registerServicio(nombre){
		return new Promise(async (resolve, reject)=>{
			try {
				const resp = await axios.post(CREATE_SERVICIO, { nombre });

				return resolve({
					status: 'success',
					data: resp.data
				});
			} catch (error) {
				return reject({
					status: 'error',
					data: error.response.data
				})
			}
		})
	}

	/**
	 *
	 * @param {number} id
	 * @param {string} nombre
	 */
	static updateServicio(id, nombre){
		return new Promise(async (resolve, reject) => {
			try {
				const resp = await axios.patch(`${UPDATE_SERVICIO}/${id}`, { nombre });

				return resolve({
					status: 'success',
					data: resp.data,
				});
			} catch (error) {
				return reject({
					status: 'error',
					data: error.response.data
				});
			}
		})
	}

	/**
	 * Retorna los idiomas de atención registrados
	 */
	static getIdiomasAtencion(){
		return new Promise(async (resolve, reject)=>{
			try {
				const resp = await axios.get(GET_IDIOMAS_ATENCION);

				return resolve({
					status: 'success',
					data: resp.data,
				});
			} catch (error) {
				return reject({
					status: 'error',
					data: error.response.data,
				});
			}
		})
	}

	static registerIdiomaAtencion(idioma){
		return new Promise(async (resolve, reject)=>{
			try {
				const resp = await axios.post(CREATE_IDIOMA_ATENCION, {
					nombre: idioma
				});

				return resolve({
					status: 'success',
					data: resp.data,
				});
			} catch (error) {
				return reject({
					status: 'error',
					data: error.response.data,
				})
			}
		})
	}

	static updateIdiomaAtencion(id, idioma){
		return new Promise(async (resolve, reject)=>{
			try {
				const resp = await axios.put(`${UPDATE_IDIOMA_ATENCION}/${id}`, {
					nombre: idioma
				})

				return resolve({
					status: 'success',
					data: resp.data
				})
			} catch (error) {
				return reject({
					status: 'error',
					data: error.response.data,
				});
			}
		})
	}

	static getOficinaImages(id){
		return new Promise(async(resolve, reject) => {
			try {
				const resp = await axios.get(`${GET_IMAGES_OFICINA}/${id}/images`)

				return resolve({
					status: 'success',
					data: resp.data
				});
			} catch (error) {
				return reject({
					status: 'error',
					data: error.response.data,
				});
			}
		})
	}

	static updateImagesOficina(id, data){
		return new Promise(async(resolve, reject)=>{
			try{
				const resp = await axios.post(`${UPDATE_IMAGES_OFICINA}/${id}`, data, {
					headers:{
						'Content-type' : 'multipart/form-data',
					}
				})

				return resolve({
					status: 'success',
					data: resp.data
				});

			} catch (error) {
				return reject({
					status: 'error',
					data: error.response.data,
				});
			}
		})
	}

	static updateOficina(id, data){
		return new Promise(async(resolve, reject)=>{
			try {
				const resp = await axios.put(`${UPDATE_OFICINA}/${id}`, data)

				return resolve({
					status: 'success',
					data: resp.data,
				});
			} catch (error) {
				return reject({
					status: 'error',
					data: error.response.data
				})
			}
		})
	}

	static getSalasJuntas(){
		return new Promise(async(resolve, reject) => {
			try {
				const resp = await axios.get(GET_SALAS_JUNTAS);

				return resolve({
					status: 'success',
					data: resp.data,
				});
			} catch (error) {
				return reject({
					status: 'error',
					data: error.response.data,
				});
			}
		})
	}

	static getCatTiemposRenta(){
		return new Promise(async(resolve, reject) => {
			try {
				const resp = await axios.get(GET_CAT_TIPOS_TIEMPOS_RENTA);

				return resolve({
					status: 'success',
					data: resp.data,
				});
			} catch (error) {
				return reject({
					status: 'error',
					data: error.response.data,
				});
			}
		})
	}

	static registerSalaJuntas(data){
		return new Promise(async(resolve, reject)=>{
			try {
				const resp = await axios.post(REGISTER_SALA_JUNTAS, data, {
					headers:{
						'Content-type' : 'multipart/form-data',
					}
				})

				return resolve({
					status: 'success',
					data: resp.data,
				});
			} catch (error) {
				return reject({
					status: 'error',
					data: error.response.data,
				});
			}
		})
	}

	static getSalaJuntasImage(id){
		return new Promise(async (resolve, reject) => {
			try {
				const resp = await axios.get(`${GET_IMAGES_SALA_JUNTAS}/${id}/images`)

				return resolve({
					status: 'success',
					data: resp.data
				})
			} catch (error) {
				return reject({
					status: 'error',
					data: error.response.data,
				})
			}
		})
	}

	static updateSalaJuntas(id, data){
		return new Promise(async (resolve, reject) => {
			try {
				const resp = await axios.put(`${UPDATE_SALA_JUNTAS}/${id}`, data);

				return resolve({
					status: 'success',
					data: resp.data
				})
			} catch (error) {
				return reject({
					status: 'error',
					data: error.response.data,
				})
			}
		})
	}

	static updateImagesSalaJuntas(id, data){
		return new Promise(async (resolve, reject) => {
			try {
				const resp = await axios.post(`${UPDATE_IMAGES_SALA_JUNTAS}/${id}`, data, {
					headers:{
						'Content-type' : 'multipart/form-data',
					}
				});

				return resolve({
					status: 'success',
					data: resp.data,
				});
			} catch (error) {
				return reject({
					status: 'error',
					data: error.response.data,
				})
			}
		})
	}

	static async getUsuarios(accesstoken){
		try {
			const resp = await axios.get(GET_USERS, {
				headers:{
					Authorization: `Bearer ${accesstoken}`
				}
			})

			return {
				status: 'success',
				data: resp.data,
			}
		} catch (error) {
			return{
				status: 'error',
				data : error.response.data,
			}
		}
	}

	static async getNotifications(accessToken){
		try {
			const resp = await axios.get(GET_NOTIFICATIONS, {
				headers:{
					Authorization: `Bearer ${accessToken}`
				}
			})

			return {
				status: 'success',
				data: resp.data,
			}
		} catch (error) {
			return{
				status: 'error',
				data : error.response.data,
			}
		}
	}

	static async deleteAllNotifications(accessToken){
		try {
			const resp = await axios.delete(DELETE_ALL_NOTIFICATIONS, {
				headers:{
					Authorization: `Bearer ${accessToken}`
				}
			})

			return {
				status: 'success',
				data: resp.data,
			}
		} catch (error) {
			return{
				status: 'error',
				data : error.response.data,
			}
		}
	}

	static async deleteNotificationById(id, accessToken){
		try {
			const resp = await axios.delete(`${DELETE_NOTIFICATION_BY_ID}/${id}`, {
				headers:{
					Authorization: `Bearer ${accessToken}`
				}
			})

			return {
				status: 'success',
				data: resp.data,
			}
		} catch (error) {
			return{
				status: 'error',
				data : error.response.data,
			}
		}
	}

	static async getSolicitudes(accessToken){
		try {
			const resp = await axios.get(GET_SOLICITUDES, {
				headers:{
					Authorization: `Bearer ${accessToken}`
				}
			})

			return {
				status: 'success',
				data: resp.data,
			}
		} catch (error) {
			return{
				status: 'error',
				data : error.response.data,
			}
		}
	}

}


export default Europa3Api;
