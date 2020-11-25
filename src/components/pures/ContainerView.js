import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const ContainerView = props => (
	<section className = 'container-fluid'>
		{!props.toBack &&
		<div className="d-sm-flex align-items-center justify-content-between mb-4">
			<h1 className="h2 mb-0 text-gray-800">{ props.headerTitle }</h1>
			{ props.elementHeader }
		</div>
		}
		{props.toBack &&
		<div className = 'd-flex justify-content-around'>
			<a className = 'text-reset' onClick = {()=>{
				props.history.goBack();
			}}
				style = {{ cursor: 'pointer' }}
			>
				<FontAwesomeIcon icon = {faArrowLeft} className = 'mt-2' style = {{ fontSize: 25}} />
			</a>
			<h1 className="h2 mb-0 text-gray-800 ml-4">{ props.headerTitle }</h1>
			<div className = 'mt-2'>
				{ props.elementHeader }
			</div>
		</div>
		}
		{ props.children }
	</section>
)

ContainerView.propTypes = {
	headerTitle: PropTypes.string,
	elementHeader: PropTypes.element,
	toBack: PropTypes.string,
}

export default withRouter(ContainerView);
