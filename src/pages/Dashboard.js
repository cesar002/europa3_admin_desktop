import React from 'react'

import NavBar from '../components/pures/NavBarHeader'
import DashboardContainer from '../components/dashboard/DashboardContainer'
import DashboardMenu from '../components/dashboard/DashboardMenu'

class Dashboard extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			menuItems:[

			]
		}
	}

	render(){
		return(
			<React.Fragment>
				<NavBar />
				<DashboardContainer>

				</DashboardContainer>
			</React.Fragment>
		)
	}
}

export default Dashboard
