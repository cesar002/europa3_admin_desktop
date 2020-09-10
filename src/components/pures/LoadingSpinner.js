import React from 'react';

const LoadingSpinner = ({ text }) => (
	<div className="text-center">
		<div className="spinner-border text-primary" style ={{width: '4rem', height: '4rem'}} role="status" />
		<p className = "mt-3"><strong>{ text }</strong></p>
	</div>
)

export default LoadingSpinner;
