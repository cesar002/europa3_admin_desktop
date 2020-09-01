import React from 'react'

import SiderMenu from '../containers/SiderMenu'

const ContainerWrapper = props => (
	<div id = 'wrapper'>
		<SiderMenu />
		{props.children}
	</div>
)

export default ContainerWrapper
