import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faAngleDown } from '@fortawesome/free-solid-svg-icons'

const Header = ({ type, title, menuItems, id, dropdownHeader }) => {

	switch (type) {
		case 'default':
			return (
				<div className="card-header">
					{ title }
				</div>
			)
		case 'basic':
			return(
				<div className="card-header py-3">
					<h6 className="m-0 font-weight-bold text-primary">
						{ title }
					</h6>
				</div>
			)
		case 'dropdown':
			return (
				<div className="card-header py-3 d-flex flex-row align-items-center justify-content-between pr-5">
					<h6 className="m-0 font-weight-bold text-primary">
						{ title }
					</h6>
					<div className="dropdown no-arrow">
						<a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<FontAwesomeIcon icon = { faEllipsisV } />
						</a>
						<div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
							<div className="dropdown-header">{ dropdownHeader }</div>
							{ menuItems.map((item, i)=> (
								<a key = {i} className="dropdown-item" href="#">
									{item.name}
								</a>
							))}
						</div>
					</div>
				</div>
			);
		case 'collapse':
			return(
				<a href={`#${id}`} className="d-block card-header py-3 d-flex flex-row align-items-center justify-content-between" data-toggle="collapse" role="button" aria-expanded="true" aria-controls={id}>
					<h6 className="m-0 font-weight-bold text-primary">
						{ title }
					</h6>
					<span className = 'pl-5'>
						<FontAwesomeIcon  icon = { faAngleDown }/>
					</span>
				</a>
			)
		default:
			return <React.Fragment />
	}
}

const Body = ({ type, id, textBody }) => {
	if(type !=='collapse'){
		return (
			<div className = 'card-body'>
				{ textBody }
			</div>
		)
	}

	return(
		<div className="collapse show" id={id}>
			<div className = 'card-body'>
				{ textBody }
			</div>
		</div>
	)
}



const DCard = (props) => {

	return (
		<div className = {`card mb-4 ${ props.type != 'default' ? 'shadow' : ''  }`}>
			<Header {...props}/>
			<Body
				type = { props.type }
				textBody = { props.textBody }
				id = { props.id }
			/>
		</div>
	)
}

DCard.propTypes = {

	type: PropTypes.oneOf(['default', 'basic', 'dropdown', 'collapse']),
	textBody: PropTypes.string,
	title: PropTypes.string,
	id: PropTypes.string.isRequired,
	menuItems: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		to: PropTypes.string
	}))
}

DCard.defaultProps = {
	type: 'default'
}

export default DCard
