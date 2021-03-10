import io from 'socket.io-client';
import Echo from 'laravel-echo';

import { SOCKET_URL } from '../../api/URLS';

import * as solicitudesActions from '../actions/solicitudesAction'
import * as userActions from '../actions/userActions'

// const laravelEcho = new Echo({
// 	broadcaster: "socket.io",
// 	host: SOCKET_URL,
// 	client: io,
// });


export default function Sockets({ store }){

	// laravelEcho.channel('solicitudes-visitas-channel').listen('.solicitud-visita-created', solic => {
	// 	store.dispatch(solicitudesActions.addSolicitudVisitaFromNotification(solic.message));
	// })

	// laravelEcho.channel('notifications-admin-channel').listen('.notificacion-enviada', noti => {
	// 	store.dispatch(userActions.addNotificationSolicitud(noti.message))
	// })

}
