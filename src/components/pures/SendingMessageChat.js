import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import 'moment/locale/es';

const SendingMessageChat = props => {

	return(
		<div className = 'outgoing_msg mt-3'>
			<div className = 'sent_msg'>
				<p>{ props.text }</p>
				<Moment className = 'time_date'
					locale = 'es'
					format = 'lll'
				>
					{ props.createdAt }
				</Moment>
			</div>
		</div>
	);
}

SendingMessageChat.propTypes = {
	text: PropTypes.string,
	createdAt: PropTypes.any,
}

export default SendingMessageChat;
