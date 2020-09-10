import isDev from 'electron-is-dev'

const PROD_BASE_URL = ''
const DEV_BASE_URL = 'http://europa3_backend.oo/api/v1'

export const BASE_URL = isDev ? DEV_BASE_URL : PROD_BASE_URL;

export const LOGIN = '/auth/admin';
export const INFO_PERSONAL = '/auth/admin/me';
export const EDIFICIOS = '/edificios';
export const EDIFICIO = '/edificio';
export const REGISTER_EDIFICIO = '/edificio';
export const ESTADOS = '/estados';
export const MUNICIPIOS = '/municipios/estado';
