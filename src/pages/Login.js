import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as initLoadActions from '../redux/actions/initLoadActions'

import LoginContainer from '../components/login/LoginContainer'
import LoginForm from '../components/login/LoginForm'
import LoginLoad from '../components/login/LoginLoading'

import { startFetchLogin } from '../redux/actions/loginActions'
// import DBService from '../services/StorageTokensService'

class Login extends React.Component{

	constructor(props) {
		super(props)

		this.state = {
			username: '',
			password: '',
			pass: true
		}

		this.login = this.login.bind(this);
	}

	componentDidMount(){
		this.props.fetchSystemData();
	}

	componentDidUpdate(prevProps){
		if(this.props.loginData.status.success && this.props.userStatus.success){
				this.props.history.push('/inicio');
		}
	}

	login(values){
		this.setState({
			...values
		}, () => this.props.startLogin(values.username, values.password));
	}


	render(){
		return(
			<LoginContainer>
				{(this.props.loginData.status.start || this.props.userStatus.start) &&
				<LoginLoad />
				}
				{(!this.props.loginData.status.start && !this.props.userStatus.start) &&
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
	loginData: state.loginData,
	userStatus: state.userData.status,
})

const mapDispatchToProps = dispatch => ({
	startLogin(username, password){
		dispatch(startFetchLogin(username, password))
	},
	fetchSystemData(){
		dispatch(initLoadActions.startFetchSystemData())
	},
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
