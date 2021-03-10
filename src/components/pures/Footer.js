import React from 'react';
import { VERSION_APP } from '../../contants/globals'

const Footer = () => (
	<footer className = 'sticky-footer bg-white'>
		<div className = 'container my-auto'>
			<div className = 'copyright text-center my-auto'>
				<p>Europa 3 gestor - versión { VERSION_APP }</p>
			</div>
		</div>
	</footer>
)

export default Footer;
