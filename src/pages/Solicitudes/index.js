import React from 'react';
import { connect } from 'react-redux';

import * as solicitudesActions from '../../redux/actions/solicitudesAction';

import Container from '../../components/pures/ContainerMaster';
import EmptyScreen from '../../components/pures/EmptyScreen';
import Loading from '../../components/pures/LoadingScreen';

class Solicitudes extends React.Component{
	constructor(props){
		super(props);

		this.renderSoliciudes = this.renderSoliciudes.bind(this);
		this.renderLoading = this.renderLoading.bind(this);
		this.renderEmpty = this.renderEmpty.bind(this);
	}

	componentDidMount(){
		this.props.fetchSolicitudes();
	}

	renderLoading(){
		if(this.props.solicitudesStatus.start){
			return <Loading text = 'Cargando solicitudes' mt = { 13 } />
		}
	}

	renderEmpty(){
		if(!this.props.solicitudesStatus.start && this.props.solicitudes.length == 0){
			return  <EmptyScreen text = 'No hay solicitudes' mt = { 13 } />
		}
	}

	renderSoliciudes(){

	}

	render(){
		return(
			<Container title = 'Solicitudes de renta'>
				<section className = 'my-4 px-4'>
					{ this.renderLoading() }
					{ this.renderEmpty() }
				</section>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	solicitudes: state.solicitudesData.solicitudes,
	solicitudesStatus: state.solicitudesData.status.solicitudes,
})

const mapDispatchToProps = dispatch => ({
	fetchSolicitudes(){
		dispatch(solicitudesActions.startFetchSolicitudes());
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Solicitudes)
