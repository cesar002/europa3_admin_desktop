import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEnvelope, faBars, faBook } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment'
import 'moment/locale/es'

const DropdownItem = ({ type = '', title = '', badgeCount = 0, messages = []  }) => (
	<li className = 'nav-item dropdown no-arrow mx-1'>
		<a className = 'nav-link dropdown-toggle' href ='#' id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			{/* <i className='fas fa-bell fa-fw' /> */}
			<FontAwesomeIcon icon = { type == 'notification'? faBell : faEnvelope }/>
			{ badgeCount > 0 &&
			<span className = 'badge badge-danger badge-counter'>
				{ badgeCount }
			</span>
			}
		</a>
		<div className = 'dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in' aria-labelledby="alertsDropdown">
			<h4 className = 'dropdown-header'>
				{ title }
			</h4>
			<div className = 'overflow-auto notifications-container'>
				{ messages.length > 0 &&
				<React.Fragment>
				{ messages.map((not) => (
					<a key = {not.id} className = 'dropdown-item d-flex align-items-center' href = '#'>
						<div className = 'dropdown-list-image mr-3'>
							{type == 'notification' &&
							<div className="icon-circle bg-primary text-white">
								<FontAwesomeIcon icon = { faBook } />
							</div>
							}
							{type == 'chat' &&
							<img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt="" />
							}
						</div>
						<div className = 'font-weight-bold'>
							{ type == 'chat' &&
							<div className = 'text-truncate'>
								{ not.message }
							</div>
							}
							{ type == 'notification' &&
							<div style = {{ fontSize: 12, }}> { not.data.body } </div>
							}
							<div className="small text-gray-500">
								{not.data.email} <Moment fromNow>{not.created_at}</Moment>
							</div>
						</div>
					</a>
				)) }
				</React.Fragment>
				}
				{ !messages.length  &&
				<div className = 'text-center mt-3'>
					<h5>Sin mensajes recientes</h5>
				</div>
				}
			</div>
			<a className="dropdown-item text-center small text-gray-500" href="#">
				{ type == 'notification' ? 'Ver todas las notificaciones' : 'Ver todos los mensajes' }
			</a>
		</div>
	</li>
)

class NavBarHeader extends React.PureComponent{

	constructor(props){
		super(props);
	}

	render(){
		return(
			<nav className = 'navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>
				<button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
					<FontAwesomeIcon icon = { faBars } />
				</button>
				<ul className = 'navbar-nav ml-auto'>
					<DropdownItem
						type = 'notification'
						title = 'Notificaciones'
						badgeCount = { this.props.notificaciones.length }
						messages = { this.props.notificaciones }
					/>
					<DropdownItem type = 'chat' title = 'Chats' />

					<div className="topbar-divider d-none d-sm-block"></div>

					<li className = 'nav-item dropdown no-arrow'>
						<a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<span className="mr-2 d-none d-lg-inline text-gray-600 small mr-3">
								{ this.props.userName }
							</span>
							<img className="img-profile rounded-circle" src={this.props.urlAvatar? this.props.urlAvatar : 'https://source.unsplash.com/QAB-WJcbgJk/60x60'} />
						</a>
						<div className = 'dropdown-menu dropdown-menu-right shadow animated--grow-in' aria-labelledby = 'userDropdown'>
							<a className ='dropdown-item' href = '#'>
								<i className = 'fas fa-cogs fa-sm fa-fw mr-2 text-gray-400' />
								Configuración
							</a>
							<div className="dropdown-divider" />
							<a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
								<i className = 'fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400' />
								Cerrar sesión
							</a>
						</div>
					</li>
				</ul>
			</nav>
		);
	}
}

NavBarHeader.propTypes = {
	userName: PropTypes.string.isRequired,
	urlAvatar: PropTypes.string,
	notificaciones: PropTypes.array.isRequired,
}


export default NavBarHeader
