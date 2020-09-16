import React from 'react'

import Loading from './LoadingSpinner';

const LoadingScreen = ({ text, mt = 8 }) => (
	<div className = 'h-100 w-100 d-flex justify-content-center' style = {{ marginTop: `${mt}rem` }}>
		<Loading text = {text} />
	</div>
)

export default LoadingScreen;
