import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import SimpleCol from './SimpleColInfo';

const InformacionPersonalSolicitud = props => {

	return(
		<div className = 'container'>
			<div className = 'row py-4'>
				<SimpleCol
					label = 'Nombre'
					text = { props.infoPersonal.nombre }
				/>
				<SimpleCol
					label = 'Apellido paterno'
					text = { props.infoPersonal.ape_p }
				/>
				<SimpleCol
					label = 'Apellido materno'
					text = { props.infoPersonal.ape_m }
				/>
			</div>
			<div className = 'row py-4'>
				<SimpleCol
					label = 'Nacionalidad'
					text = { props.infoPersonal.nacionalidad.gentilicio }
				/>
				<SimpleCol
					label = 'Fecha de nacimiento'
					text = { moment(props.infoPersonal.fecha_nacimiento).format('DD/MM/YYYY') }
				/>
			</div>
			<div className = 'row py-4'>
				<SimpleCol
					label = 'Domicilio'
					text = { props.infoPersonal.domicilio }
				/>
				<SimpleCol
					label = 'Teléfono'
					text = { props.infoPersonal.telefono }
				/>
				<SimpleCol
					label = 'Celular'
					text = { props.infoPersonal.celular }
				/>
			</div>
			<div className = 'row py-4'>
				<SimpleCol
					label = 'Identificación'
					text = { `${
						props.infoPersonal.tipo_identificacion_id == 5
							? props.infoPersonal.tipo_identificacion_otro
							: props.infoPersonal.tipo_identificacion.nombre} No. ${props.infoPersonal.numero_identificacion}` }
				/>
				<SimpleCol
					label = 'RFC'
					text = { props.infoPersonal.RFC }
				/>
				<SimpleCol
					label = 'CURP'
					text = { props.infoPersonal.CURP }
				/>
			</div>
			<div className = 'row py-4'>

			</div>
		</div>
	);
}

InformacionPersonalSolicitud.propTypes = {
	infoPersonal: PropTypes.object.isRequired,
}

export default InformacionPersonalSolicitud;
