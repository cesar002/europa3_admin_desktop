import React from 'react'

import Container from '../components/pures/ContainerMaster'

import Card from '../components/pures/DCard'

class Dashboard extends React.Component{

	constructor(props){
		super(props);
	}

	render(){
		return(
			<Container title = 'Dashboard'>
				<Card type = 'dropdown' title = 'Card' textBody = 'Esto es una card' menuItems = {[
					{name: 'Cosa', to: 'wea'}
				]}  />
				<Card type = 'collapse' title = 'Card' textBody = 'Esto es una card' id = 'card-2'  />
			</Container>
		)
	}
}

export default Dashboard
