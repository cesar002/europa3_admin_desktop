import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import LocalStorage from '../services/UserCredencialsStorageService'
import * as initLoadAction from '../redux/actions/initLoadActions'


class PreAuth extends React.Component{

	constructor(props) {
		super(props);

		this.autoLogin = this.autoLogin.bind(this);
	}

	componentDidMount(){
		console.log('autologin')
		this.autoLogin();
	}

	componentDidUpdate(prevProps){
		if(this.props.userData.status.success){
			this.props.history.push('/inicio');
		}

		if(this.props.userData.status.fail){
			this.props.history.push('/login');
		}
	}

	autoLogin(){
		if(!LocalStorage.existCredentials()){
			this.props.history.push('/login');
		}else{
			this.props.startInitLoad();
		}
	}

	render(){
		return(
			<div className = 'container-fluid h-100 w-100 d-flex justify-content-center'>
				<div style = {{ marginTop: '18rem' }}>
					<div className="text-center">
						<div className="spinner-border text-primary" style ={{width: '4rem', height: '4rem'}} role="status" />
						<p className = "mt-3"><strong>Verificando sesión</strong></p>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	userData: state.userData,
})

const mapDispatchToProps = dispatch => ({
	startInitLoad(){
		dispatch(initLoadAction.startInitAll());
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PreAuth))
