import React from 'react';
import PropTypes from 'prop-types';

const Badge = (props) => {

	const style = () => {
		switch (props.type) {
			case 'primary':
				return 'badge-primary'
			case 'secondary':
				return 'badge-secondary'
			case 'success':
				return 'badge-success'
			case 'danger':
				return 'badge-danger'
			case 'warning':
				return 'badge-warning'
			case 'info':
				return 'badge-info'
			case 'light':
				return 'badge-light'
			case 'dark':
				return 'badge-dark'
			default:
				return 'badge-secundary'
		}
	}

	return (
	<span className = {`badge ${style()}`}>{props.texto}</span>
	)
}

Badge.propTypes = {
	texto: PropTypes.string,
	type: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'])
}

Badge.defaultProps = {
	texto: '',
}

export default Badge;
