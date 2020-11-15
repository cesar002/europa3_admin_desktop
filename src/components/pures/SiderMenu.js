import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBuilding, faChair, faChevronRight, faBroom, faHome,
	faUser, faPager, faCogs, faBell, faEnvelopeOpenText, faBriefcase,
	faComment, faUserShield, faCouch
} from '@fortawesome/free-solid-svg-icons'

const Divider = () => (
	<hr className = 'sidebar-divider my-0' />
)

const Heading = ({ title = '' }) => (
	<div className = 'sidebar-heading'>
		{ title }
	</div>
)

const SimpleNavItem = ({ icon = null, title = '', active = false, to = '' }) => (
	<li className = {`nav-item ${active? 'active' : '' }`}>
		<Link className = 'nav-link' to = {to}>
			{ icon &&
				<FontAwesomeIcon icon = { icon } className = 'mr-2'/>
			}
			<span>{ title }</span>
		</Link>
	</li>
)

// items : { header: 'string', items: [ {'title', 'to'} ] }
const DropdownNavItem = ({id = '', icon = null ,title = '', active = false, items = [] } ) => (
	<li className = {`nav-item ${active? 'active' : ''}`}>
		<a className="nav-link collapsed" href="#" data-toggle="collapse" data-target={`#collapse-${id}`} aria-expanded="true" aria-controls={`collapse-${id}`}>
			{ icon &&
			<FontAwesomeIcon icon = { icon } className = 'mr-2' />
			}
			<span>{ title }</span>
			<div className = 'float-right'>
				<FontAwesomeIcon icon = { faChevronRight } className = 'mr-2' />
			</div>
		</a>
		<div id = {`collapse-${id}`} className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
			<div className = 'bg-white py-2 collapse-inner rounded'>
				{ items.map((item, i) => (
					<React.Fragment key = {i}>
						{item.header &&
						<h6 className = 'collapse-header'>
							{item.header}
						</h6>
						}
						{ item.items.map((t, c) => (
							<React.Fragment key = { c }>
								<a className = 'collapse-item'>{t.title}</a>
							</React.Fragment>
						)) }
					</React.Fragment>
				)) }
			</div>
		</div>
	</li>
)

class SiderMenu extends React.PureComponent{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		// console.log(this.props.currentPath);
	}

	render(){
		return(
			<ul id = 'accordionSidebar' className = 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'>
				<div className = 'sidebar-brand d-flex align-items-center justify-content-center'>
					<div className="sidebar-brand-text mx-3">Europa 3</div>
				</div>
				<Divider />

				<SimpleNavItem
					to = '/inicio'
					active = { this.props.currentPath == '/inicio' }
					title = 'Inicio'
					icon = { faHome }
				/>
				<Divider />

				{(this.props.permisos.filter(p => (p.id == 1 || p.id == 2 || p.id ==3))).length > 0 &&
				<React.Fragment>
					<Heading title = 'Usuarios y solicitudes' />
					<SimpleNavItem
						title = 'Usuarios'
						icon = { faUser }
						to = '/usuarios'
						active = { this.props.currentPath.includes('/usuarios') }
					/>
					<SimpleNavItem title = 'Solicitudes' icon = { faPager } />
					<Divider />
				</React.Fragment>
				}

				{(this.props.permisos.filter(p => (p.id == 1 || p.id == 4 || p.id == 5))).length > 0 &&
				<React.Fragment>
					<Heading title = 'Edificios y oficinas'  />
					<SimpleNavItem
						to = '/edificios'
						active = { this.props.currentPath.includes('/edificios') }
						title = 'Edificios'
						icon = { faBuilding }
					/>
					<SimpleNavItem to = '/oficinas'
						title = 'Oficinas'
						icon = { faBriefcase }
						active = { this.props.currentPath.includes('/oficinas') }
					/>
					<SimpleNavItem to = '/sala-juntas'
						active = { this.props.currentPath.includes('/sala-juntas') }
						title = 'Sala de juntas'
						icon = { faCouch }
					/>
					<Divider />
				</React.Fragment>
				}

				{(this.props.permisos.filter(p => (p.id == 1 || p.id == 6))).length > 0 &&
				<React.Fragment>
					<SimpleNavItem
						active = { this.props.currentPath.includes('/mobiliario') }
						title = 'Mobiliario'
						icon = { faChair }
						to = '/mobiliario'
					/>
					<Divider />
				</React.Fragment>
				}

				{(this.props.permisos.filter(p => (p.id == 1 || p.id == 7))).length > 0 &&
				<React.Fragment>
					<Heading title = 'Servicios' />
					<SimpleNavItem
						title = 'Servicios'
						icon = { faBroom } to = '/servicios'
						active = {this.props.currentPath.includes('/servicios')} />
					<SimpleNavItem
						title = 'Idiomas de atención'
						icon = { faComment }
						to = '/idiomas-atencion'
						active = {this.props.currentPath.includes('/idiomas-atencion')}
					/>
					{/* <DropdownNavItem id = 'consumibles' title = 'Consumibles' icon = { faVial }
						items = {[
							{ items:[
								{ title: 'Insumos', to: '' },
								{ title: 'Paquetes', to: '' },
							] }
						]}
					/> */}
					<Divider />
				</React.Fragment>
				}

				{(this.props.permisos.filter(p => (p.id == 1 || p.id == 10))).length > 0 &&
				<React.Fragment>
					<Heading title = 'Envío de notificaciones' />
					<DropdownNavItem id = 'push-notification' title = 'Notificaciones push' icon = { faBell }
						items = {[
							{ items: [
								{ title: 'Notificacion a usuario', to: '' },
								{ title: 'Notificacion global', to: ''}
							]},
						]}
					/>
					<DropdownNavItem  id = 'email-notification' title = 'Notificación por email' icon = { faEnvelopeOpenText }
						items = {[
							{ items: [
								{ title: 'Email a usuario', to: '' },
								{ title: 'Email global', to: '' }
							] }
						]}
					/>
					<Divider />
				</React.Fragment>
				}

				{(this.props.permisos.filter(p => p.id == 1)).length > 0 &&
				<React.Fragment>
					<Heading title = 'Admin' />
					<SimpleNavItem title = 'Usuarios sistema' icon = { faUserShield } />
					<SimpleNavItem title = 'Configuración' icon = { faCogs } />
				</React.Fragment>
				}
			</ul>
		);
	}

}

SiderMenu.propTypes = {
	permisos: PropTypes.array.isRequired,
	currentPath: PropTypes.string.isRequired,
}

export default SiderMenu
