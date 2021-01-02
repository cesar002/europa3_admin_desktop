import React from 'react';
import PropTypes from 'prop-types';


const ChatListItem = props => {

	const onClick = () => {
		props.onClick(props.id);
	}

	return(
		<div className = {`chat_list ${props.activo ? 'active_chat' : ''}`} onClick = { onClick }>
			<div className = 'd-flex flex-row'>
				<div className = 'mr-3'>
					<img src = { props.img } style = {{ width: '35px', height: '35px', borderRadius: '100%' }} />
				</div>
				<div className = 'd-flex flex-column'>
					<div className = 'd-flex flex-row justify-content-between'>
						<h5>
							{ props.nombre }
							{ props.fecha &&
							<span className = 'chat_date'>Dec 25</span>
							}
						</h5>
					</div>
					<p className="d-inline-block text-truncate" style = {{ maxWidth: '150px' }}>
						{ props.ultimoMensaje }
					</p>
				</div>
			</div>
		</div>
	)
}

ChatListItem.propTypes = {
	id: PropTypes.number,
	img: PropTypes.string,
	nombre: PropTypes.string,
	fecha: PropTypes.string,
	ultimoMensaje: PropTypes.string,
	onClick: PropTypes.func,
	activo: PropTypes.bool
}

export default ChatListItem;
