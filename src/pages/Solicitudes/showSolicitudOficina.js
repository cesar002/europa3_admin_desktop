import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import moment from 'moment';

import * as solicitudesActions from '../../redux/actions/solicitudesAction';

import Loading from '../../components/pures/LoadingScreen';
import Container from '../../components/pures/ContainerMaster';


class ShowSolicitudOficina extends React.Component{
	constructor(props){
		super(props)

		this.fetchSolicitudshow = this.fetchSolicitudshow.bind(this);
		this.setTabIndex = this.setTabIndex.bind(this);
		this.renderTab = this.renderTab.bind(this);

		this.state = {
			tabIndex : 0,
		}
	}

	componentDidMount(){
		this.fetchSolicitudshow();
	}

	fetchSolicitudshow(){
		const id = this.props.match.params.id;
	}

	setTabIndex(i){
		this.setState({
			tabIndex: i,
		})
	}

	renderTab(){
		return(
			<ul className = 'nav nav-tabs mt-4'>
				<li className = 'nav-item'>
					<a className = {`nav-link ${this.state.tabIndex == 0 ? 'active' : ''}`}
						onClick = { () => this.setTabIndex(0) }
						style = {{ cursor: 'pointer' }}
					>
						Información de la solicitud
					</a>
				</li>
				<li className = 'nav-item'>
					<a className = {`nav-link ${this.state.tabIndex == 1 ? 'active' : ''}`}
						onClick = { () => this.setTabIndex(1) }
						style = {{ cursor: 'pointer' }}
					>
						Información personal
					</a>
				</li>
				<li className = 'nav-item'>
					<a className = {`nav-link ${this.state.tabIndex == 2 ? 'active' : ''}`}
						onClick = { () => this.setTabIndex(2) }
						style = {{ cursor: 'pointer' }}
					>
						Información fiscal
					</a>
				</li>
				<li className = 'nav-item'>
					<a className = {`nav-link ${this.state.tabIndex == 3 ? 'active' : ''}`}
						onClick = { () => this.setTabIndex(3) }
						style = {{ cursor: 'pointer' }}
					>
						Información moral
					</a>
				</li>
				<li className = 'nav-item'>
					<a className = {`nav-link ${this.state.tabIndex == 4 ? 'active' : ''}`}
						onClick = { () => this.setTabIndex(4) }
						style = {{ cursor: 'pointer' }}
					>
						Documentos
					</a>
				</li>
			</ul>
		)
	}

	render(){
		return(
			<Container title = 'Solicitud de oficina' toBack = '/solicitudes'>
				<section className = 'my-4 px-4'>
					{ this.renderTab() }
				</section>
			</Container>
		);
	}
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShowSolicitudOficina))
