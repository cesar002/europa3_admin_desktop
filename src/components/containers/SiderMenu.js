import React from 'react'
import { connect } from 'react-redux'

import Sider from '../pures/SiderMenu'

class SiderMenu extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return <Sider permisos = { this.props.permisos } />
	}
}

const mapStateToProps = state => ({
	permisos: state.userData.userData.permisos,
})

export default connect(mapStateToProps)(SiderMenu);
