import React from 'react'

const SVGSpinner = ({width = '20', height = '20', color = '#ffff'}) => (
	<svg className = 'animate-spin h-6 w-5' width = {width} height = {height} viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke = {color}>
		<g fill="none" fillRule="evenodd">
			<g transform="translate(1 1)" strokeWidth="2">
					<circle strokeOpacity=".5" cx="18" cy="18" r="18"/>
					<path d="M36 18c0-9.94-8.06-18-18-18">
					</path>
			</g>
		</g>
	</svg>
)

export default SVGSpinner;
