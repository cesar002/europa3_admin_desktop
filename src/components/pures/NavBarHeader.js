import React from 'react'
// import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

class NavBarHeader extends React.PureComponent{

	constructor(props){
		super(props);

		this.renderdropdownMenu = this.renderdropdownMenu.bind(this);
	}

	renderdropdownMenu(titulo, to, typeIcon){
		return (
			<li className = 'nav-link waves-effect waves-light dropdown'>
				<a className = 'nav-link waves-effect waves-light dropdown-toggle' type = 'button' id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<span className="badge badge-pill badge-primary mr-2" >3</span>
					<FontAwesomeIcon icon = { faEnvelope } className = 'mr-2' />
					{ titulo }
				</a>
				<div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
					<a className="dropdown-item d-flex flex-row align-items-center border-bottom" style = {{backgroundColor: '' }} href="#">
						<div className = 'mr-3'>
							<img className = 'rounded-circle' src = 'https://semantic-ui.com/images/avatar2/large/molly.png' style = {{width: '2.5rem', height: '2.5rem'}}/>
						</div>
						<div className = 'flex-column'>
							<div className = 'text-dark'>Hola tengo algunas dudas sobre la renta...</div>
							<div className = 'small text-secondary'>Juan hace 1 día</div>
						</div>
					</a>
					<a className="dropdown-item d-flex flex-row align-items-center border-bottom" style = {{backgroundColor: 'rgba(109, 163, 181, 0.09)' }} href="#">
						{/* <span className="badge badge-pill badge-primary mr-2" >3</span> */}
						<div className = 'mr-3'>
							<img className = 'rounded-circle' src = 'https://semantic-ui.com/images/avatar2/large/molly.png' style = {{width: '2.5rem', height: '2.5rem'}}/>
						</div>
						<div className = 'flex-column'>
							<div className = 'text-dark'>Hola tengo algunas dudas sobre la renta...</div>
							<div className = 'small text-secondary'>Juan haces 1 día</div>
						</div>
					</a>
					<a className="dropdown-item text-center" href="#">Ver todos los mensajes</a>
				</div>
			</li>
		)
	}


	render(){
		return(
			<nav className = 'navbar navbar-expand-lg navbar-dark bg-dark'>
				<div className = 'container'>
					<div className = 'navbar-brand'><h4>Europa 3 admin</h4></div>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className = 'nav navbar-nav nav-flex-icons ml-auto mr-5'>
							{ this.renderdropdownMenu('Mensajes recepción') }
							{ this.renderdropdownMenu('Chat soporte') }
							<li className = 'nav-link'>
								<span className = 'mr-2'>weona</span>
								<img className = 'rounded-circle' src = 'https://semantic-ui.com/images/avatar2/large/molly.png' style = {{width: '2.5rem', height: '2.5rem'}}/>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}


export default NavBarHeader
