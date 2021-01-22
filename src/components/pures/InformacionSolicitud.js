import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Label from './Badge';

const InformacionSolicitud = props => {

	const getTypeLabel = id => {
		switch (id) {
			case 1:
				return 'secondary'
			case 2:
				return 'success'
			case 3:
				return 'warning'
			case 4:
				return 'danger'
			case 5:
				return 'info'
			case 6:
				return 'primary'
			default:
				return 'secondary'
		}
	}

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
						{ props.solicitud.solicitudable.edificio.nombre }
					</span>
				</div>
				<div className = 'col'>
					<h4>Oficina/Sala: </h4>
					<span className = 'font-weight-bold'>
						{ props.solicitud.solicitudable.nombre }
					</span>
				</div>
			</div>
			<div className = 'row py-3'>
				<div className = 'col'>
					<h4>Fecha de solicitud: </h4>
					<span className = 'font-weight-bold'>
						{ moment(props.solicitud.fecha_reservacion).format('DD/MM/YYYY') }
					</span>
				</div>
				<div className = 'col'>
					<h4>Tiempo de renta: </h4>
					<span className = 'font-weight-bold'>
						{ props.solicitud.tipo_oficina !== 2 &&
						`${ props.solicitud.meses_renta } Meses`
						}
						{ props.solicitud.tipo_oficina == 2 &&
						`${ props.solicitud.hora_inicio } - ${props.solicitud.hora_fin}`
						}
					</span>
				</div>
				<div className = 'col'>
					<h4>Número de integrantes: </h4>
					<span className = 'font-weight-bold'>
						{ props.solicitud.numero_integrantes }
					</span>
				</div>
			</div>
			<div className = 'row py-3'>
				<div className = 'col'>
					<h4>Tipo de pago</h4>
					{ props.solicitud.metodo_pago == null &&
					<span className = 'font-weight-bold'>
						Sin definir
					</span>
					}
					{ props.solicitud.metodo_pago !== null &&
					<span className = 'font-weight-bold'>
						{ props.solicitud.metodo_pago.nombre }
					</span>
					}
				</div>
				<div className = 'col'>
					<h4>Estado</h4>
					<Label texto = { props.solicitud.estado.nombre }
						type = { getTypeLabel(props.solicitud.estado.id) }
					/>
				</div>
				<div className = 'col' />
			</div>
		</div>
	);
}

InformacionSolicitud.propTypes = {
	solicitud: PropTypes.object.isRequired,
}

export default InformacionSolicitud;
