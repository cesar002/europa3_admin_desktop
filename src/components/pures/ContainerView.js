import React from 'react'

const ContainerView = props => (
	<section className = 'container-fluid'>
		<div class="d-sm-flex align-items-center justify-content-between mb-4">
			<h1 class="h3 mb-0 text-gray-800">{ props.headerTitle }</h1>
		</div>
		{ props.children }
	</section>
)

export default ContainerView
