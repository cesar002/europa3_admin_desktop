import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import moment from 'moment';

import Label from './Badge';

const SolicitudRow = props => {


	const getUrlShow = () => {
		switch (props.tipoId) {
			case 1:
				return `/solicitudes/showOficina/${props.id}`
			case 2:
				return `/solicitudes/showSala/${props.id}`
			case 3:
				return `/solicitudes/showVirtual/${props.id}`
			default:
				return '/solicitudes'
		}
	}

	return (
	<tr>
		<th className='text-center'>
			{ props.folio }
		</th>
		<th className='text-center'>
			{ props.tipo }
		</th>
		<th className='text-center'>
			{ props.nombre }
		</th>
		<th className='text-center'>
			{ moment(props.fechaReservacion).format('DD/MM/YYYY') }
		</th>
		<th className='text-center'>
			{ props.tiempoRenta }
		</th>
		<th className='text-center'>
			<Label texto = { props.status } type = 'info' />
		</th>
		<th className='text-center'>
			{ props.email }
		</th>
		<th className='text-center'>
			{ props.nombreCliente }
		</th>
		<th className = 'text-center'>
			<div className = 'btn-group'>
				<Link className = 'btn btn-primary btn-sm' to = { getUrlShow() }>
					<FontAwesomeIcon icon = { faEye } />
				</Link>
			</div>
		</th>
	</tr>
)}

SolicitudRow.propTypes = {
	id: PropTypes.number.isRequired,
	folio: PropTypes.string.isRequired,
	tipo: PropTypes.string.isRequired,
	tipoId: PropTypes.number.isRequired,
	nombre: PropTypes.string.isRequired,
	fechaReservacion: PropTypes.any.isRequired,
	tiempoRenta: PropTypes.number.isRequired,
	status: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	nombreCliente: PropTypes.string.isRequired,
}

export default SolicitudRow;
