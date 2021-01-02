import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment'
import 'moment/locale/es';

const RecivedMessageChat = props => {

	return(
		<div className = 'incoming_msg mt-3'>
			<div className = 'incoming_msg_img' />
			<div className = 'received_msg'>
				<div className = 'received_withd_msg'>
					<p>{ props.text }</p>
					<Moment className = 'time_date'
						locale = 'es'
						format = 'lll'
					>
						{ props.createdAt }
					</Moment>
				</div>
			</div>
		</div>
	);
}

RecivedMessageChat.propTypes = {
	text: PropTypes.string,
	createdAt: PropTypes.any,
}

export default RecivedMessageChat
