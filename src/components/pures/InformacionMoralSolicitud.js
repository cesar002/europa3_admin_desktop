import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import SimpleCol from './SimpleColInfo';
import Row from './RowPY4';

const InformacionMoralSolicitud = props => {

	console.log(props.infoMoral);

	return(
		<div className = 'container'>
			<Row>
				<SimpleCol
					label = 'Nombre de la empresa o razón social'
					text = { props.infoMora? props.infoMoral.nombre_empresa ? props.infoMoral.nombre_empresa : 'N/A'  : 'N/A'}
				/>
			</Row>
			<Row>
				<SimpleCol
					label = 'Nombre'
					text = { props.infoMora ? props.infoMoral.nombre ? props.infoMoral.nombre : 'N/A' : 'N/A' }
				/>
				<SimpleCol
					label = 'Apellido paterno'
					text = { props.infoMora ? props.infoMoral.ape_p ? props.infoMoral.ape_p : 'N/A' : 'N/A' }
				/>
				<SimpleCol
					label = 'Apellido materno'
					text = { props.infoMora ? props.infoMoral.ape_m ? props.infoMoral.ape_m : 'N/A' : 'N/A'}
				/>
			</Row>
			<Row>
				<SimpleCol
					label = 'Escritura pública'
					text = { props.infoMora ? props.infoMoral.escritura_publica ? props.infoMoral.escritura_publica : 'N/A' : 'N/A'}
				/>
				<SimpleCol
					label = 'Notario número'
					text = { props.infoMora ? props.infoMoral.numero_notario ? props.infoMoral.numero_notario : 'N/A' : 'N/A'}
				/>
			</Row>
			<Row>
				<SimpleCol
					label = 'Fecha de constitución'
					text = { props.infoMora ? props.infoMoral.fecha_constitucion !== null ? moment(props.infoMoral.fecha_constitucion).format('DD/MM/YYYY') : 'N/A' : 'N/A'}
				/>
				<SimpleCol
					label = 'Giro comercial'
					text = { props.infoMora ? props.infoMoral.giro_comercial ? props.infoMoral.giro_comercial : 'N/A' : 'N/A'}
				/>
			</Row>
			<Row>
				<SimpleCol
					label = 'Teléfono'
					text = { props.infoMora ? props.infoMoral.telefono ? props.infoMoral.telefono : 'N/A' : 'N/A'}
				/>
				<SimpleCol
					label = 'Email'
					text = { props.infoMora ? props.infoMoral.email ? props.infoMoral.email : 'N/A' : 'N/A'}
				/>
			</Row>
		</div>
	);
}

InformacionMoralSolicitud.propTypes = {
	infoMoral: PropTypes.object.isRequired,
}

export default InformacionMoralSolicitud;
