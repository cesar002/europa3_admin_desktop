import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBuilding, faChair, faChevronRight, faBroom, faHome,
	faUser, faPager, faCogs, faBell, faEnvelopeOpenText, faBriefcase,
	faComment, faUserShield, faVial
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
		<a className = 'nav-link' href='#'>
			{ icon &&
			<FontAwesomeIcon icon = { icon } className = 'mr-2'/>
			}
			<span>{ title }</span>
		</a>
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


	render(){
		return(
			<ul id = 'accordionSidebar' className = 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'>
				<div className = 'sidebar-brand d-flex align-items-center justify-content-center'>
					<div className="sidebar-brand-text mx-3">Europa 3</div>
				</div>
				<Divider />

				<SimpleNavItem title = 'Inicio' icon = { faHome } />
				<Divider />

				<Heading title = 'Usuarios y solicitudes' />
				<SimpleNavItem title = 'Usuarios' icon = { faUser } />
				<SimpleNavItem title = 'Solicitudes' icon = { faPager } />
				<Divider />

				<Heading title = 'Edificios y oficinas'  />
				<SimpleNavItem title = 'Edificios' icon = { faBuilding } />
				<SimpleNavItem title = 'Oficinas' icon = { faBriefcase } />
				<Divider />

				<Heading title = 'Gestión de mobiliario' />
				{/* <SimpleNavItem title = 'Registro' icon = { faChair }  /> */}
				<DropdownNavItem  id = 'mobiliario' icon = { faChair } title = 'Mobiliario'
					items = {[
						{ items: [
							{ title: 'Registro de mobiliario', to: '' },
							{ title: 'Gestión de mobiliario', to: '' },
						] },
					]}
				/>
				<Divider />

				<Heading title = 'Servicios' />
				<SimpleNavItem title = 'Servicios' icon = { faBroom } />
				<SimpleNavItem title = 'Idiomas de atención' icon = { faComment } />
				<DropdownNavItem id = 'consumibles' title = 'Consumibles' icon = { faVial }
					items = {[
						{ items:[
							{ title: 'Insumos', to: '' },
							{ title: 'Paquetes', to: '' },
						] }
					]}
				/>
				<Divider />

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

				<Heading title = 'Admin' />
				<SimpleNavItem title = 'Usuarios sistema' icon = { faUserShield } />
				<SimpleNavItem title = 'Configuración' icon = { faCogs } />
			</ul>
		);
	}

}

export default SiderMenu
