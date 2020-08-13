import React from 'react'
import { withRouter } from 'react-router-dom'

import LoginContainer from '../components/login/LoginContainer'
import LoginForm from '../components/login/LoginForm'
// import LoginLoad from '../components/login/LoginLoading'

class Login extends React.Component{

	constructor(props) {
		super(props)

		this.login = this.login.bind(this);
	}

	login(values){
		// return new Promise((resolve, reject)=>{
		// 	setTimeout(() => {
		// 		this.props.history.push('/dashboard')
		// 	}, 3000);
		// 	resolve();
		// })
		return new Promise(resolve => setTimeout(() => {
			this.props.history.push('/dashboard')
			resolve()
		}, 4000))
	}


	render(){
		return(
			<LoginContainer>
				<LoginForm loginHandle = {this.login} />
			</LoginContainer>
		)
	}
}


export default withRouter(Login);
