import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

const Header = props => {

	switch (props.type) {
		case 'default':
			return (
				<div className="card-header">
					{ props.title }
				</div>
			)
		case 'basic':
			return(
				<div className="card-header py-3">
					<h6 className="m-0 font-weight-bold text-primary">
						{ props.title }
					</h6>
				</div>
			)
		case 'dropdown':
			return (
				<div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
					<h6 className="m-0 font-weight-bold text-primary">
						{ props.title }
					</h6>
					<div className="dropdown no-arrow">
					<a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<FontAwesomeIcon icon = { faEllipsisV } />
					</a>
					<div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
						<div className="dropdown-header">{ props.dropdownHeader }</div>
						{ props.menuItems.map((item, i)=> (
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
				<a href={`#${props.id}`} className="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls={props.id}>
					<h6 className="m-0 font-weight-bold text-primary">
						{ props.title }
					</h6>
				</a>
			)
		default:
			return <React.Fragment />
	}
}

const Body = ({ type, id, textBody }) => {
	if(type == 'collapse'){
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

	const id = Math.random().toString(19).substring(7);

	return (
		<div className = {`card mb-4 ${ props.type != 'default' ? 'shadow' : ''  }`}>
			<Header {...props}/>
			<Body
				type = { props.type }
				textBody = { props.textBody }
				id = { id }
			/>
		</div>
	)
}

export default DCard
