import { LOCAL_STORAGE_KEY } from '../contants/globals'

class UserCredencialsStorageService{

	static setCredentials( userCredentials ){
		window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userCredentials));
	}

	static getCredentials(){
		const data = localStorage.getItem(LOCAL_STORAGE_KEY);

		if(data){
			return JSON.parse(data);
		}

		return {}
	}

	static getAccessToken(){
		const data = this.getCredentials();

		return data == null ? data.access_token : '';
	}
}

export default UserCredencialsStorageService;
