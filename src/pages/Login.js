import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import LoginContainer from '../components/login/LoginContainer'
import LoginForm from '../components/login/LoginForm'
import LoginLoad from '../components/login/LoginLoading'

import { startFetchLogin } from '../redux/actions/loginActions'

class Login extends React.Component{

	constructor(props) {
		super(props)

		this.state = {
			username: '',
			password: '',
		}

		this.login = this.login.bind(this);
	}

	login(values){
		this.setState({
			...values
		})

		this.props.startLogin(values.username, values.password);
	}


	render(){
		return(
			<LoginContainer>
				{this.props.loginData.status.start &&
				<LoginLoad />
				}
				{!this.props.loginData.status.start &&
				<LoginForm
					loginHandle = { this.login }
					loginData = {{
						username: this.state.username,
						password: this.state.password
					}}
					errorLogin = { this.props.loginData.error }
				/>
				}
			</LoginContainer>
		)
	}
}

const mapStateToProps = state => ({
	loginData: state.loginData
})

const mapDispatchToProps = dispatch => ({
	startLogin(username, password){
		dispatch(startFetchLogin(username, password))
	},
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
