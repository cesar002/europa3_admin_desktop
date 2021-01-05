import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import pusher from 'pusher-js';
import Echo from 'laravel-echo';

import { PUSHER_CLUSTER, PUSHER_FORCE_TLS, PUSHER_KEY } from '../../contants/ApiKeys';

import * as userActions from '../../redux/actions/userActions';
import * as chatActions from '../../redux/actions/chatActions';

export default ( WrapperComponent ) => {

	let laravelEcho = new Echo({
		broadcaster: "pusher",
		key: PUSHER_KEY,
		cluster: PUSHER_CLUSTER,
		forceTLS: PUSHER_FORCE_TLS,
	});

	const NewComponent = props => {

		useEffect(() => { initChannels() });

		const initChannels = () => {
			// if(props._userData.id){
			// 	connectSocket();

			// 	laravelEcho.channel(`notificacion.edificio.${props._userData.edificio.id}`).notification(noti => {
			// 		props.addSolicitudNotification(noti)
			// 	})

			// 	joinChats();

			// }else{
			// 	disconnectSocket();
			// }
		}

		const joinChats = () => {
			props._solicitudesChats.forEach(chat => {
				laravelEcho.channel(`chat.recepcion.${chat.id}`)
					.listen('.chat-message-sending', data => {
						const message = data.message.message;
						if(message.sender_by == 2){
							props.recivedChatMessage(message);
						}
					})
			})
		}

		const connectSocket = () => {
			laravelEcho.connect();
		}

		const disconnectSocket = () => {
			laravelEcho.disconnect()
		}

		return (
			<React.Fragment>
				<WrapperComponent { ...props } />
			</React.Fragment>
		)
	}

	const mapStateToProps = state => ({
		_userData: state.userData.userData,
		_solicitudesChats: state.chatsData.chatsCopy,
	})

	const mapDispatchToProps = dispatch => ({
		addSolicitudNotification(notification){
			dispatch(userActions.addNotificationSolicitud(notification));
		},
		recivedChatMessage(message){
			dispatch(chatActions.receivingMessageChat(message))
		},
	})

	return connect(mapStateToProps, mapDispatchToProps)(NewComponent);
}
