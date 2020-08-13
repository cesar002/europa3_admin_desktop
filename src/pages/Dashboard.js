import React from 'react'

import NavBar from '../components/pures/Navbar'
import Menu from '../components/pures/MenuDash'

class Dashboard extends React.Component{
	render(){
		return(
			<React.Fragment>
				<NavBar />
				<Menu />
			</React.Fragment>
		)
	}
}

export default Dashboard
