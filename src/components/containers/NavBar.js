import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Nav from '../pures/NavBarHeader'

import Europa3Api from '../../api';
import CredencialesService from '../../services/UserCredencialsStorageService'

import * as userActions from '../../redux/actions/userActions';


class NavBar extends React.Component{
	constructor(props){
		super(props);

		this.logout = this.logout.bind(this);
	}

	async logout(){
		try {
			const resp = await Europa3Api.logout();

			if(resp.status !== 'success'){
				throw resp.data
			}

			CredencialesService.deleteCredentials();

			this.props.history.push("/");
		} catch (error) {
			console.log(error)
		}
	}

	render(){
		return (
			<Nav
				userName = { this.props.userData.username }
				urlAvatar = { this.props.userData.infoPersonal.avatar }
				notificaciones = { this.props.notificaciones }
				loadingNotifications = { this.props.startFetchNotifications }
				loadingMarkToNotifications = { this.props.startFetchMarkToReadNotifications }
				handleMarkToReadNotifications = { this.props.markToReadNotifications }
				handleLogout = { this.logout }
				loading = { this.props.userDataStatus.start }
			/>
		)
	}
}

const mapStateToProps = state => ({
	userData: state.userData.userData,
	userDataStatus: state.userData.status,
	notificaciones: state.userData.notificaciones.solicitudes,
	startFetchNotifications: state.userData.status.notificaciones.solicitudes.start,
	startFetchMarkToReadNotifications: state.userData.status.markAllRead.start,
})

const mapDispatchToProps = dispatch => ({
	markToReadNotifications(){
		dispatch(userActions.startFetchMarkAllNotificationsAsRead());
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
