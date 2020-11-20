import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Echo from 'laravel-echo';

import { SOCKET_URL } from '../../api/URLS';
import * as userActions from '../../redux/actions/userActions';

export default ( WrapperComponent ) => {

	const laravelEcho = new Echo({
		broadcaster: "socket.io",
		host: SOCKET_URL,
		client: io,
	});

	const NewComponent = props => {

		useEffect(() => { initChannels() });

		const initChannels = () => {
			if(props._userData.id){

				laravelEcho.channel('notificacion.edificio.1').notification(noti => {
					props.addSolicitudNotification(noti)
				})

			}
		}

		return (
			<React.Fragment>
				<WrapperComponent { ...props } />
			</React.Fragment>
		)
	}

	const mapStateToProps = state => ({
		_userData: state.userData.userData,
	})

	const mapDispatchToProps = dispatch => ({
		addSolicitudNotification(notification){
			dispatch(userActions.addNotificationSolicitud(notification));
		}
	})

	return connect(mapStateToProps, mapDispatchToProps)(NewComponent);
}
