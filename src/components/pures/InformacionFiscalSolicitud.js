import React from 'react'
import PropTypes from 'prop-types';

import SimpleCol from './SimpleColInfo';
import Row from './RowPY4';

const InformacionFiscalSolicitud = props => {

	return(
		<div className = 'container'>
			<Row>
				<SimpleCol
					label = 'Razón social'
					text = { props.infoFiscal.razon_social }
				/>
				<SimpleCol
					label = 'RFC'
					text = { props.infoFiscal.RFC }
				/>
			</Row>
			<Row>
				<SimpleCol
					label = 'Email'
					text = { props.infoFiscal.email }
				/>
				<SimpleCol
					label = 'Teléfono'
					text = { props.infoFiscal.telefono }
				/>
			</Row>
			<Row>
				<SimpleCol
					label = 'Colonia'
					text = { props.infoFiscal.colonia }
				/>
				<SimpleCol
					label = 'Calle'
					text = { props.infoFiscal.calle }
				/>
				<SimpleCol
					label = 'Codigo postal'
					text = { props.infoFiscal.codigo_postal }
				/>
			</Row>
			<Row>
				<SimpleCol
					label = 'Número exterior'
					text = { props.infoFiscal.numero_exterior ? props.infoFiscal.numero_exterior : 'N/A' }
				/>
				<SimpleCol
					label = 'Número interior'
					text = { props.infoFiscal.numero_interior ? props.infoFiscal.numero_interior : 'N/A' }
				/>
			</Row>
			<Row>
				<SimpleCol
					label = 'Estado'
					text = { props.infoFiscal.estado.nombre }
				/>
				<SimpleCol
					label = 'Municipio'
					text = { props.infoFiscal.municipio.nombre }
				/>
			</Row>
		</div>
	);
}

InformacionFiscalSolicitud.propTypes = {
	infoFiscal: PropTypes.object.isRequired,
}

export default InformacionFiscalSolicitud;
