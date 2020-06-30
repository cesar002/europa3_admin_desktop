import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

class DashboardMenu extends React.PureComponent{


	render() {
		return (
			<ul className = 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'
				id = 'accordionSidebar'
			>
				<a className = 'sidebar-brand d-flex align-items-center justify-content-center'>
					<div className = 'sidebar-brand-text mx-3'>
						Europa 3
					</div>
				</a>
			</ul>
			// <nav id = 'sidebarMenu' className = 'col-md-3 col-lg-2 d-md-block bg-light sidebar collapse'>
			// 	<div className = 'sidebar-sticky pt-3'>
			// 		<ul className = 'nav flex-column'>
			// 			<li className = 'nav-item'>
			// 				<a className = 'nav-link active' style = {{color: 'black'}} >
			// 					<span className = 'pr-3'><FontAwesomeIcon icon = { faHome } /></span>
			// 					Inicio
			// 				</a>
			// 			</li>
			// 			{[1,2,3,4,5,6,7,8,9,10].map(e=>(
			// 			<li className = 'nav-item' key = {e}>
			// 				<a className = 'nav-link' style = {{color: 'black'}} >
			// 					<span className = 'pr-3'><FontAwesomeIcon icon = { faHome } /></span>
			// 					Inicio
			// 				</a>
			// 			</li>
			// 			))}
			// 		</ul>
			// 	</div>
			// </nav>
		)
	}
}

export default DashboardMenu;
