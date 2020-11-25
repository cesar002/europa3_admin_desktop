import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const InformacionSolicitud = props => {

	return(
		<div className = 'container'>
			<div className = 'row py-3'>
				<div className = 'col'>
					<h4>Folio de solicitud: </h4>
					<span className = 'font-weight-bold'>
						{ props.solicitud.folio }
					</span>
				</div>
				<div className = 'col'>
					<h4>Edificio: </h4>
					<span className = 'font-weight-bold'>
						{ props.solicitud.solicitud_oficina.oficina.edificio.nombre }
					</span>
				</div>
				<div className = 'col'>
					<h4>Oficina/Sala: </h4>
					<span className = 'font-weight-bold'>
						{ props.solicitud.solicitud_oficina.oficina.nombre }
					</span>
				</div>
			</div>
			<div className = 'row py-3'>
				<div className = 'col'>
					<h4>Fecha de solicitud: </h4>
					<span className = 'font-weight-bold'>
						{ moment(props.solicitud.solicitud_oficina.fecha_reservacion).format('DD/MM/YYYY') }
					</span>
				</div>
				<div className = 'col'>
					<h4>Tiempo de renta: </h4>
					<span className = 'font-weight-bold'>
						{ props.solicitud.solicitud_oficina.meses_renta } Meses
					</span>
				</div>
				<div className = 'col'>
					<h4>Número de integrantes: </h4>
					<span className = 'font-weight-bold'>
						{ props.solicitud.solicitud_oficina.numero_integrantes }
					</span>
				</div>
			</div>
			<div className = 'row py-3'>
				<div className = 'col'>
					<h4>Tipo de pago</h4>
					{ props.solicitud.solicitud_oficina.metodo_pago == null && 'Sin definir' }
					{ props.solicitud.solicitud_oficina.metodo_pago !== null &&
					<span className = 'font-weight-bold'>
						{ props.solicitud.solicitud_oficina.metodo_pago.nombre }
					</span>
					}
				</div>
			</div>
		</div>
	);
}

InformacionSolicitud.propTypes = {
	solicitud: PropTypes.object.isRequired,
}

export default InformacionSolicitud;
