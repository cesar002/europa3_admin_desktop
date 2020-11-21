import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import 'moment/locale/es';

import {
	TYPE_NOTIFICATION_SOLICITUD_OFICINA,
	TYPE_NOTIFICATION_SOLICITUD_SALA,
	TYPE_NOTIFICATION_SOLICITUD_VIRTUAL,
}
from '../../contants/notificationsType';

const NotificationCardItem = props => {

	const getTypeSolicitud = (id) => {
		switch (id) {
			case TYPE_NOTIFICATION_SOLICITUD_VIRTUAL:
				return 'Solicitud de oficina virtual'
			case TYPE_NOTIFICATION_SOLICITUD_SALA:
				return 'Solicitud de sala de juntas'
			case TYPE_NOTIFICATION_SOLICITUD_OFICINA:
				return 'Solicitud de oficina fisica'
			default:
				return ''
		}
	}

	const deleteNotification = () => {
		props.handleDelete(props.idNotification)
	}

	return (
	<div className = 'row py-3 px-5'>
		<div className = 'col'>
			<p className = 'text-center'>
				{ getTypeSolicitud(props.typeId) }
			</p>
		</div>
		<div className = 'col'>
			<div className = 'd-flex flex-column'>
				<p className = 'text-secondary'>{ props.texto }</p>
				<Moment fromNow>{props.date}</Moment>
			</div>
		</div>
		<div className = 'col'>
			{props.fetching &&
			<div className="spinner-border text-primary" role="status" />
			}
			{!props.fetching &&
			<div className="btn-group" role="group" aria-label="Basic example">
				<Link className = 'btn btn-primary btn-sm' to = '/'>
					<FontAwesomeIcon icon = { faEye } />
				</Link>
				<button className = 'btn btn-danger btn-sm'
					onClick = { deleteNotification }
				>
					<FontAwesomeIcon icon = { faTrash } />
				</button>
			</div>
			}
		</div>
	</div>
	)
}

NotificationCardItem.propTypes = {
	idNotification: PropTypes.string.isRequired,
	texto: PropTypes.string.isRequired,
	date: PropTypes.any.isRequired,
	typeId: PropTypes.number,
	fetching: PropTypes.bool,
	handleDelete: PropTypes.func,
}

export default NotificationCardItem
