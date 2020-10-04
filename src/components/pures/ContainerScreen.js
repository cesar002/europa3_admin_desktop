import React from 'react';

import NavBar from '../containers/NavBar';
import Footer from './Footer';

const ContainerScreen = (props) => (
	<section id='content-wrapper' className= 'd-flex flex-column'>
		<div id = 'content'>
			<NavBar />
			{ props.children }
		</div>
		<Footer />
	</section>
)

export default ContainerScreen
