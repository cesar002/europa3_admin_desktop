import isDev from 'electron-is-dev'

const PROD_BASE_URL = ''
const DEV_BASE_URL = 'http://europa3_backend.oo/api/v1'

export const BASE_URL = isDev ? DEV_BASE_URL : PROD_BASE_URL;

export const LOGIN = '/auth/admin';
export const INFO_PERSONAL = '/auth/admin/me';
export const EDIFICIOS = '/edificios';
export const EDIFICIO = '/edificio';
export const REGISTER_EDIFICIO = '/edificio';
export const UPDATE_EDIFICIO = '/edificio'
export const ESTADOS = '/estados';
export const MUNICIPIOS = '/municipios/estado';
export const OFICINAS_ALL = '/oficinas';
export const OFICINAS_EDIFICIO = '/oficinas/edificio';
export const GET_OFICINAS_SIZE = '/oficina-size';
export const REGISTER_OFICINA = '/oficina';
export const UPDATE_OFICINA = '/oficina';
export const UPDATE_IMAGES_OFICINA = '/oficina-images';
export const REGISTER_MOBILIARIO = '/mobiliario';
export const MOBILIARIO_ALL = '/mobiliario';
export const GET_TIPO_MOBILIARIO = '/tipo-mobiliario';
export const GET_MOBILIARIO_BY_EDIFICIO = '/mobiliario/edificio';
export const GET_SERVICIOS = '/servicios';
export const CREATE_SERVICIO = '/servicio';
export const UPDATE_SERVICIO= '/servicio';
export const GET_IDIOMAS_ATENCION = '/idiomas-atencion';
export const CREATE_IDIOMA_ATENCION = '/idioma-atencion';
export const UPDATE_IDIOMA_ATENCION = '/idioma-atencion';
export const GET_IMAGES_OFICINA = '/oficina';
export const GET_SALA_JUNTAS = '/salas-juntas';
export const GET_CAT_TIPOS_TIEMPOS_RENTA = '/tiempos-renta';
