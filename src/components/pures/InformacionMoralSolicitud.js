import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import SimpleCol from './SimpleColInfo';
import Row from './RowPY4';

const InformacionMoralSolicitud = props => {

	return(
		<div className = 'container'>
			<Row>
				<SimpleCol
					label = 'Nombre de la empresa o razón social'
					text = { props.infoMoral.nombre_empresa ? props.infoMoral.nombre_empresa : 'N/A' }
				/>
			</Row>
			<Row>
				<SimpleCol
					label = 'Nombre'
					text = { props.infoMoral.nombre ? props.infoMoral.nombre : 'N/A' }
				/>
				<SimpleCol
					label = 'Apellido paterno'
					text = { props.infoMoral.ape_p ? props.infoMoral.ape_p : 'N/A' }
				/>
				<SimpleCol
					label = 'Apellido materno'
					text = { props.infoMoral.ape_m ? props.infoMoral.ape_m : 'N/A' }
				/>
			</Row>
			<Row>
				<SimpleCol
					label = 'Escritura pública'
					text = { props.infoMoral.escritura_publica ? props.infoMoral.escritura_publica : 'N/A' }
				/>
				<SimpleCol
					label = 'Notario número'
					text = { props.infoMoral.numero_notario ? props.infoMoral.numero_notario : 'N/A' }
				/>
			</Row>
			<Row>
				<SimpleCol
					label = 'Fecha de constitución'
					text = { props.infoMoral.fecha_constitucion !== null ? moment(props.infoMoral.fecha_constitucion).format('DD/MM/YYYY') : 'N/A' }
				/>
				<SimpleCol
					label = 'Giro comercial'
					text = { props.infoMoral.giro_comercial ? props.infoMoral.giro_comercial : 'N/A' }
				/>
			</Row>
			<Row>
				<SimpleCol
					label = 'Teléfono'
					text = { props.infoMoral.telefono ? props.infoMoral.telefono : 'N/A' }
				/>
				<SimpleCol
					label = 'Email'
					text = { props.infoMoral.email ? props.infoMoral.email : 'N/A' }
				/>
			</Row>
		</div>
	);
}

InformacionMoralSolicitud.propTypes = {
	infoMoral: PropTypes.object.isRequired,
}

export default InformacionMoralSolicitud;
