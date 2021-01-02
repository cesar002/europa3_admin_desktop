import React from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import * as solicitudesActions from '../../redux/actions/solicitudesAction';

import SolicitudRow from '../../components/pures/SolicitudRow';
import Container from '../../components/pures/ContainerMaster';
import EmptyScreen from '../../components/pures/EmptyScreen';
import Loading from '../../components/pures/LoadingScreen';

class Solicitudes extends React.Component{
	constructor(props){
		super(props);

		this.renderSoliciudes = this.renderSoliciudes.bind(this);
		this.renderLoading = this.renderLoading.bind(this);
		this.renderEmpty = this.renderEmpty.bind(this);
		this.renderSolicitudesRow = this.renderSolicitudesRow.bind(this);
		this.renderPaginationNav = this.renderPaginationNav.bind(this);
		this.selectedPagination = this.selectedPagination.bind(this);

		this.state = {
			currentIndexPagination: 0,

		}
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

	renderSolicitudesRow(){
		const { currentIndexPagination } = this.state;



		return this.props.solicitudesPaginated[currentIndexPagination].map((soli) => (
			<SolicitudRow
				key = { soli.folio }
				email = { soli.user.email }
				nombreCliente = { soli.user.info_personal !== null
					? `${soli.user.info_personal.nombre} ${soli.user.info_personal.ape_p} ${soli.user.info_personal.ape_m}`
					: 'Sin datos'
				}
				folio = { soli.folio }
				id = { soli.id }
				fechaReservacion = { soli.fecha_reservacion }
				tiempoRenta = { soli.meses_renta }
				nombre = { soli.solicitudable.nombre }
				tipoId = { soli.tipo_oficina.id }
				tipo = { soli.tipo_oficina.tipo }
				estado = { soli.estado }
			/>
		))
	}

	selectedPagination(e){
		const i = e.selected
		this.setState({ currentIndexPagination: i })
	}

	renderPaginationNav(){
		return(
			<ReactPaginate
				extraAriaContext = 'Page navigation'
				previousLabel = 'Anterior'
				nextLabel = 'Siguiente'
				breakLabel = '...'
				pageCount = {this.props.solicitudesPaginated.length}
				pageRangeDisplayed = { 9 }
				previousClassName = 'page-item'
				nextClassName = 'page-item'
				pageLinkClassName = 'page-link'
				activeLinkClassName = 'page-link'
				nextLinkClassName = 'page-link'
				previousLinkClassName = 'page-link'
				containerClassName = 'pagination justify-content-center'
				activeClassName = 'active'
				pageClassName = 'page-item'
				onPageChange = { this.selectedPagination }
			/>
		)
	}

	renderSoliciudes(){
		if(!this.props.solicitudesStatus.start && this.props.solicitudes.length > 0){
			return(
				<React.Fragment>
					<table className = 'table table-responsive'>
						<thead>
							<tr>
								<th className = 'text-center' scope = 'col'>Folio</th>
								<th className = 'text-center' scope = 'col'>Oficina/Sala</th>
								<th className = 'text-center' scope = 'col'>Nombre</th>
								<th className = 'text-center' scope = 'col'>Fecha de solicitud</th>
								<th className = 'text-center' scope = 'col'>Tiempo de renta</th>
								<th className = 'text-center' scope = 'col'>Estado</th>
								<th className = 'text-center' scope = 'col'>Email usuario</th>
								<th className = 'text-center' scope = 'col'>Nombre usuario</th>
								<th className = 'text-center' scope = 'col'></th>
							</tr>
						</thead>
						<tbody>
							{ this.renderSolicitudesRow() }
						</tbody>
					</table>
					{ this.renderPaginationNav() }
				</React.Fragment>
			);
		}
	}

	render(){
		return(
			<Container title = 'Solicitudes de renta'>
				<section className = 'my-4 px-4'>
					{ this.renderLoading() }
					{ this.renderEmpty() }
					{ this.renderSoliciudes() }
				</section>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	solicitudes: state.solicitudesData.solicitudes,
	solicitudesPaginated: state.solicitudesData.solicitudesPaginated,
	solicitudesStatus: state.solicitudesData.status.solicitudes,
})

const mapDispatchToProps = dispatch => ({
	fetchSolicitudes(){
		dispatch(solicitudesActions.startFetchSolicitudes());
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Solicitudes)
