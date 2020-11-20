import React from 'react'
import { connect } from 'react-redux'

import Nav from '../pures/NavBarHeader'

import * as userActions from '../../redux/actions/userActions';

class NavBar extends React.Component{
	constructor(props){
		super(props);
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
			/>
		)
	}
}

const mapStateToProps = state => ({
	userData: state.userData.userData,
	notificaciones: state.userData.notificaciones.solicitudes,
	startFetchNotifications: state.userData.status.notificaciones.solicitudes.start,
	startFetchMarkToReadNotifications: state.userData.status.markAllRead.start,
})

const mapDispatchToProps = dispatch => ({
	markToReadNotifications(){
		dispatch(userActions.startFetchMarkAllNotificationsAsRead());
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
