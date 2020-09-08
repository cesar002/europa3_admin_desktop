import React from 'react'
import { connect } from 'react-redux'

import Nav from '../pures/NavBarHeader'

class NavBar extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<Nav userName = { this.props.userData.username }  />
		)
	}
}

const mapStateToProps = state => ({
	userData: state.userData.userData,
})

export default connect(mapStateToProps)(NavBar)
