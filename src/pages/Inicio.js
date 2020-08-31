import React from 'react'
import { withRouter } from 'react-router-dom'

import NavBar from '../components/containers/NavBarContainer'
import Menu from '../components/pures/MenuDash'
import View from '../components/pures/ViewContainer'

class Inicio extends React.Component{

	componentDidMount(){
		console.log(this.props.location.pathname)
	}

	render(){
		return(
			<React.Fragment>
				<div className = 'flex flex-col'>
					<NavBar />
					<div className = 'flex flex-row'>
						<Menu
							pathName = { this.props.location.pathname }
						/>
						<View>
							<p>INICIO</p>
						</View>
					</div>
				</div>
			</React.Fragment>
		)
	}
}

export default  withRouter(Inicio)
