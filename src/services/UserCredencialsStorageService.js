import { LOCAL_STORAGE_KEY } from '../contants/globals'

class UserCredencialsStorageService{

	static setCredentials( userCredentials ){

		localStorage.clear();

		const data = {
			access_token: userCredentials.access_token,
			refresh_token: userCredentials.refresh_token,
			expire_token: (new Date()).setDate((new Date()).getDate()+7),
			expire_refresh_token: (new Date()).setDate((new Date()).getDate()+7),
		}

		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
	}

	static getCredentials(){
		const data = localStorage.getItem(LOCAL_STORAGE_KEY);

		if(data){
			return JSON.parse(data);
		}

		return null
	}

	static getAccessToken(){
		const data = this.getCredentials();

		return data == null ? data.access_token : '';
	}

	static getRefreshToken(){
		const data = this.getCredentials();

		return data == null ? data.refresh_token : '';
	}

	static tokenIsExpired(){
		const data = this.getCredentials();

		return (Date.now()) < data.expire_token
	}

	static existCredentials(){
		const data = this.getCredentials();

		return data !== null;
	}
}

export default UserCredencialsStorageService;
