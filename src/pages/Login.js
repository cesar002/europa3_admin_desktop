import React from 'react'
import { withRouter, useHistory } from 'react-router-dom'

import LoginContainer from '../components/login/LoginContainer'
import LoginForm from '../components/login/LoginForm'
import LoginLoad from '../components/login/LoginLoading'

class Login extends React.Component{

	constructor(props) {
		super(props)

		this.state = {
			loadLogin: false,
			username: '',
			password: '',
		}

		this.login = this.login.bind(this);
	}

	login(values){
		this.setState({
			loadLogin: true
		})

		setTimeout(() => {
			this.setState({
				loadLogin: false
			}, ()=> this.props.history.push('/dashboard'))
		}, 2000);
	}


	render(){
		return(
			<LoginContainer>
				{this.state.loadLogin &&
				<LoginLoad />
				}
				{!this.state.loadLogin &&
				<LoginForm loginHandle = { this.login } />
				}
			</LoginContainer>
		)
	}
}


export default withRouter(Login);
