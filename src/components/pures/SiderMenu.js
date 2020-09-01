import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBuilding, faChair, faChevronRight, faEquals, faHome
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

				<Heading title = 'Edificios y oficinas'  />
				<SimpleNavItem title = 'Edificios' icon = { faBuilding } />
				<SimpleNavItem title = 'Oficinas' icon = { faChair } />
				<Divider />

				<Heading title = 'Servicios' />
				<DropdownNavItem id = 'servicio' title = 'servicios' icon = { faEquals }
					items = {[
						{ header: 'gestión de servicios', items:[
							{ title: 'serviciso de oficina', to: '' },
							{ title: 'idiomas de atención', to: '' },]
						},
						{header: 'gestión de insumos', items: [
							{title: 'insumos', to : ''}
						]
						},
					]}
				/>
				<Divider />
			</ul>
		);
	}

}

export default SiderMenu
