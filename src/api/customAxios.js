import axios from 'axios';

import { BASE_URL } from './URLS'

const instance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	headers: {
		'Accept' : 'application/json'
	},
});

export default instance;
