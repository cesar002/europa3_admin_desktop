import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import moment from 'moment';

import * as solicitudesActions from '../../redux/actions/solicitudesAction';

import Loading from '../../components/pures/LoadingScreen';
import Container from '../../components/pures/ContainerMaster';
import InformacionSolicitud from '../../components/pures/InformacionSolicitud';
import InfoPersonalSolicitud from '../../components/pures/InformacionPersonalSolicitud';
import InfoFiscalSolicitud from '../../components/pures/InformacionFiscalSolicitud';
import InfoMoralSolicitud from '../../components/pures/InformacionMoralSolicitud';


class ShowSolicitudOficina extends React.Component{
	constructor(props){
		super(props)

		this.fetchSolicitudshow = this.fetchSolicitudshow.bind(this);
		this.setTabIndex = this.setTabIndex.bind(this);
		this.renderTab = this.renderTab.bind(this);
		this.renderBody = this.renderBody.bind(this);

		this.state = {
			tabIndex : 0,
		}
	}

	componentDidMount(){
		this.fetchSolicitudshow();
	}

	componentWillUnmount(){
		this.props.clearSolicitud();
	}

	fetchSolicitudshow(){
		const id = this.props.match.params.id;
		this.props.fetchSolicitud(id)
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

	renderBody(){
		return(
			<React.Fragment>
				{ this.renderTab() }
				<div className = 'card shadow mt-5'>
					<div className = 'card-body'>
						{ this.state.tabIndex == 0 &&
						<InformacionSolicitud solicitud = { this.props.solicitud } />
						}
						{ this.state.tabIndex == 1 &&
						<InfoPersonalSolicitud infoPersonal = { this.props.solicitud.user.info_personal } />
						}
						{ this.state.tabIndex == 2 &&
						<InfoFiscalSolicitud infoFiscal = { this.props.solicitud.user.datos_fiscales } />
						}
						{ this.state.tabIndex == 3 &&
						<InfoMoralSolicitud infoMoral = { this.props.solicitud.user.datos_morales } />
						}
					</div>
				</div>
			</React.Fragment>
		)
	}

	render(){
		return(
			<Container title = 'Solicitud de oficina' toBack = '/solicitudes'>
				<section className = 'my-4 px-4'>
					{ this.props.solicitudStatus.start &&
					<Loading mt = { 12 } text = 'Cargando solicitud...' />
					}
					{ this.props.solicitudStatus.finish && this.renderBody() }
				</section>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	solicitudStatus: state.solicitudesData.status.solicitudOficinaSelected,
	solicitud: state.solicitudesData.solicitudOficinaSelected,
})

const mapDispatchToProps = dispatch => ({
	fetchSolicitud(id){
		dispatch(solicitudesActions.startFetchSolicitudOficinaById(id));
	},
	clearSolicitud(){
		dispatch(solicitudesActions.clearSolicitudOficina())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShowSolicitudOficina))
