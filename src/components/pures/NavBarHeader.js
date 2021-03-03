import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBell, faEnvelope, faBars, faBook,
	faTrash
} from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment'
import 'moment/locale/es'



const DropdownChat = ({badgeCount = 0, chatNotificaciones = []}) => (
	<li className = 'nav-item dropdown no-arrow mx-1'>
		<a className = 'nav-link dropdown-toggle' href ='#' id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			<FontAwesomeIcon icon = { faEnvelope } />
			{ badgeCount > 0 &&
			<span className = 'badge badge-danger badge-counter'>
				{ badgeCount }
			</span>
			}
		</a>
		<div className = 'dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in' aria-labelledby="alertsDropdown">
			<div className = 'dropdown-header d-flex justify-content-between'>
				<span>Chats</span>
				<div>
					<FontAwesomeIcon icon = { faTrash } style = {{ fontSize: '13px' }} />
				</div>
			</div>
			<div className = 'overflow-auto notifications-container'>
				{ chatNotificaciones.length > 0 &&
				<React.Fragment>
				{ chatNotificaciones.map((chat) => (
					<a key = {chat.id} className = 'dropdown-item d-flex align-items-center' href = '#'>
						<div className = 'dropdown-list-image mr-3'>
							<img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt="" />
						</div>
						<div className = 'font-weight-bold'>
							<div className = 'text-truncate'>
								{ chat.message }
							</div>
							<div className="small text-gray-500">
								<Moment fromNow>{chat.created_at}</Moment>
							</div>
						</div>
					</a>
				)) }
				</React.Fragment>
				}
				{ !chatNotificaciones.length  &&
				<div className = 'text-center mt-3'>
					<h5>Sin mensajes recientes</h5>
				</div>
				}
			</div>
			<button type = 'button' className = 'dropdown-item text-center small text-gray-500' data-toggle = 'modal' data-target = '#chat-solicitudes'>
				Ver todos los mensajes
			</button>
		</div>
	</li>
)

const DropdownNotification = ({badgeCount = 0, notificaciones = [],fetchNotifications, fetchMark ,handleMark = () => {}}) => (
	<li className = 'nav-item dropdown no-arrow mx-1'>
		<a className = 'nav-link dropdown-toggle' href ='#' id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			<FontAwesomeIcon icon = { faBell }/>
			{ badgeCount > 0 &&
			<span className = 'badge badge-danger badge-counter'>
				{ badgeCount }
			</span>
			}
		</a>
		<div className = 'dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in' aria-labelledby="alertsDropdown">
			<div className = 'dropdown-header d-flex justify-content-between form-inline'>
				<span>Notificaciones</span>
				<button className = 'btn btn-primary btn-sm' onClick = { handleMark }>
					<FontAwesomeIcon icon = { faTrash } style = {{ fontSize: '13px' }} />
				</button>
			</div>
			<div className = 'overflow-auto notifications-container'>
				{(!fetchNotifications && !fetchMark) && notificaciones.length > 0 &&
				<React.Fragment>
				{ notificaciones.map((not) => {
					if(not.read_at == null){
						return(
						<a className = 'dropdown-item d-flex align-items-center' href = '#' key = {not.id}>
							<div className = 'dropdown-list-image mr-3'>
								<div className="icon-circle bg-primary text-white">
									<FontAwesomeIcon icon = { faBook } />
								</div>
							</div>
							<div className = 'font-weight-bold'>
								<div style = {{ fontSize: 12, }}>
									{ not.data.body }
								</div>
								<div className="small text-gray-500">
									<Moment fromNow>{not.created_at}</Moment>
								</div>
							</div>
						</a>
						)
					}
				})}
				</React.Fragment>
				}
				{(!fetchNotifications && !fetchMark) && notificaciones.length == 0  &&
				<div className = 'text-center mt-3'>
					<h5>Sin mensajes recientes</h5>
				</div>
				}
				{(fetchNotifications || fetchMark) &&
				<div className = 'spinner-border text-primary' />
				}
			</div>
			<Link className = 'dropdown-item text-center small text-gray-500' to = '/notificaciones'>
				Ver todos los mensajes
			</Link>
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
					{/* <FontAwesomeIcon icon = { faBars } /> */}
				</button>
				<ul className = 'navbar-nav ml-auto'>
					{ this.props.loading &&
					<div className="spinner-border text-primary float-right" role="status" />
					}
					{ !this.props.loading &&
					<React.Fragment>
						<DropdownNotification
							notificaciones ={ this.props.notificaciones }
							badgeCount = { this.props.notificaciones.length == 0
								? 0
								: this.props.notificaciones.reduce((acc, cur) => cur.read_at == null ? ++acc : acc, 0)
							}
							handleMark = { this.props.handleMarkToReadNotifications }
							fetchNotifications = { this.props.loadingNotifications }
							fetchMark = { this.props.loadingMarkToNotifications }
						/>
						<DropdownChat
							chatNotificaciones = { [] }
							badgeCount = { 0 }
						/>
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
								<button className="dropdown-item" onClick = { this.props.handleLogout }>
									<i className = 'fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400' />
									Cerrar sesión
								</button>
							</div>
						</li>
					</React.Fragment>
					}
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
