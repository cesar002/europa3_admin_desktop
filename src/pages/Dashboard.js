import React from 'react'

import NavBar from '../components/pures/Navbar'
import Menu from '../components/pures/MenuDash'
import Inicio from './viewsContent/Inicio'

class Dashboard extends React.Component{
	render(){
		return(
			<React.Fragment>
				<div className = 'flex flex-col'>
					<NavBar />
					<div className = 'flex flex-row'>
						<Menu />
						<Inicio />
					</div>
				</div>
			</React.Fragment>
		)
	}
}

export default Dashboard
