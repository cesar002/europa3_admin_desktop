import React from 'react';

const EmptyScreen = ({text, mt = 0}) => (
	<div className = 'h-100 w-100 d-flex justify-content-center'>
		<div className = 'text-center' style = {{ marginTop: `${mt}rem` }}>
			<h3>{ text }</h3>
		</div>
	</div>
)

export default EmptyScreen
