import React from 'react'

import NavBar from '../components/containers/NavBarContainer'
import Menu from '../components/pures/MenuDash'
import View from '../components/pures/ViewContainer'

class Prueba extends React.Component{
	render(){
		return(
			<React.Fragment>
				<div className = 'flex flex-col'>
					<NavBar />
					<div className = 'flex flex-row'>
						<Menu />
						<View>
							<p>Prueba</p>
						</View>
					</div>
				</div>
			</React.Fragment>
		)
	}
}

export default Prueba
