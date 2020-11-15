
import io from 'socket.io-client';
import Echo from 'laravel-echo'

import { SOCKET_URL } from './URLS'


export default function Sockets( storage ){

	window.io = io;
	const echo = new Echo({
		broadcaster: "socket.io",
		host: SOCKET_URL,
	});

	echo.channel('notificacion.edificio.1')
	.notification(data => {
		console.log(data)
	});
}
