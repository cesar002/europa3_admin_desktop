import React from 'react'
import PropTypes from 'prop-types'

import Wrapper from './ContainerWrapper'
import Screen from './ContainerScreen'
import View from './ContainerView'

const ContainerMaster = props => (
	<Wrapper>
		<Screen>
			<View headerTitle = {props.title} elementHeader = {props.elementHeader} toBack = {props.toBack} >
				{ props.children }
			</View>
		</Screen>
	</Wrapper>
)

ContainerMaster.propTypes = {
	title: PropTypes.string,
	elementHeader: PropTypes.element,
	toBack: PropTypes.string,
}

ContainerMaster.defaultProps = {
	title: '',
}

export default ContainerMaster
