import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Echo from 'laravel-echo';

import { SOCKET_URL } from '../../api/URLS';
import * as userActions from '../../redux/actions/userActions';
import * as chatActions from '../../redux/actions/chatActions'

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
					console.log(noti)
					props.addSolicitudNotification(noti)
				})

				props.chats.forEach(chat => {
					laravelEcho.channel(`chat.recepcion.${chat.id}`).listen('.chat-message-sending', e => {
						if(e.message.message.sender_by == 2){
							props.addMessageChat(e.message.message)
						}
					})
				});
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
		chats: state.chatsData.chats,
	})

	const mapDispatchToProps = dispatch => ({
		addSolicitudNotification(notification){
			dispatch(userActions.addNotificationSolicitud(notification));
		},
		addMessageChat(message){
			dispatch(chatActions.receivingMessageChat(message))
		},
	})

	return connect(mapStateToProps, mapDispatchToProps)(NewComponent);
}
