import React from 'react'
import { connect } from 'react-redux'

import Nav from '../pures/NavBarHeader'

class NavBar extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<Nav
				userName = { this.props.userData.username }
				urlAvatar = { this.props.userData.infoPersonal.avatar }
				notificaciones = { this.props.notificaciones }
			/>
		)
	}
}

const mapStateToProps = state => ({
	userData: state.userData.userData,
	notificaciones: state.userData.notificaciones,
})

export default connect(mapStateToProps)(NavBar)
