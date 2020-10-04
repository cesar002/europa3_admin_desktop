import React from 'react';
import PropTypes from 'prop-types';
import accounting from 'accounting-js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt, faPenSquare } from '@fortawesome/free-solid-svg-icons'


const CardOficinaSala = (props) => {

	const handleClickShow = () => {
		props.handleShow(props.id);
	}

	return(
		<div className = 'col-10 col-sm-6 col-md-6 col-lg-4'>
			<div className = 'card mb-3 shadow-sm p-2 mb-5 bg-white rounded' style = {{ maxWidth: '19rem' }}>
				<img className = 'card-img-top rounded' alt = {props.nombre} src = {props.urlImage} />
				<div className = 'card-body'>
					<h5 className = 'card-title'>{props.nombre}</h5>
					<h6 className = 'card-subtitle mb-2 text-muted'>Tamaño: {props.tipo_size} - {props.dimensiones}</h6>
				</div>
				<div className = 'card-footer'>
					<button type = 'button' className = 'btn btn-primary btn-sm mx-1'
						onClick = { handleClickShow }
					>
						<FontAwesomeIcon icon = { faEye } />
					</button>
				</div>
			</div>
		</div>
	)
}

CardOficinaSala.propTypes = {
	id: PropTypes.number,
	nombre: PropTypes.string,
	urlImage: PropTypes.string,
	tipo_size: PropTypes.string,
	dimensiones: PropTypes.string,
	precio: PropTypes.number,
	handleShow: PropTypes.func,
}

CardOficinaSala.defaultProps = {
	handleShow: id => {},
}

export default CardOficinaSala;
