import React from 'react';

const SimpleColInfo = ({label = '', text = '' }) => (
	<div className = 'col'>
		<h4>{ label }</h4>
		<span className = 'font-weight-bold'>
			{ text }
		</span>
	</div>
)

export default SimpleColInfo
