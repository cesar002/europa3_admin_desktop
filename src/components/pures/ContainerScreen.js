import React from 'react'

import NavBar from '../containers/NavBar'

const ContainerScreen = (props) => (
	<section id='content-wrapper' className= 'd-flex flex-column'>
		<div id = 'content'>
			<NavBar />
			{ props.children }
		</div>
		<footer className = 'sticky-footer bg-white'>
			<div className = 'container my-auto'>
				<div className = 'copyright text-center my-auto'>
					<span>Desarrollado por topito</span>
				</div>
			</div>
		</footer>
	</section>
)

export default ContainerScreen
