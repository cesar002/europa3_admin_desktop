import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import * as solicitudesActions from '../../redux/actions/solicitudesAction';

import Container from '../../components/pures/ContainerMaster';
import EmptyScreen from '../../components/pures/EmptyScreen';
import Loading from '../../components/pures/LoadingScreen';

const Label = ({texto}) => (
	<span className = 'badge badge-info'>{texto}</span>
)

class Solicitudes extends React.Component{
	constructor(props){
		super(props);

		this.renderSoliciudes = this.renderSoliciudes.bind(this);
		this.renderLoading = this.renderLoading.bind(this);
		this.renderEmpty = this.renderEmpty.bind(this);
		this.renderStatusLabel = this.renderStatusLabel.bind(this);
		this.renderSolicitudesOficinaRow = this.renderSolicitudesOficinaRow.bind(this);
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

	renderStatusLabel(solicitud){
		if(solicitud.iniciado){
			return <Label texto = 'Iniciado' />
		}
		if(solicitud.subida_documentos){
			return <Label texto = 'Documentos subidos' />
		}
		if(solicitud.autorizado){
			return <Label texto = 'Autorizado' />
		}
		if(solicitud.finalizado){
			return <Label texto = 'Finalizado' />
		}
		if(solicitud.revalidado){
			return <Label texto = 'Revalidada' />
		}
	}

	renderSolicitudesOficinaRow(){
		return this.props.solicitudes.map((soli) => (
			<tr key = {soli.folio}>
				<th className = 'text-center'>{soli.folio}</th>
				<th className = 'text-center'>{soli.solicitud_oficina.oficina.nombre}</th>
				<th className = 'text-center'>
					{ moment(soli.solicitud_oficina.fecha_reservacion).format('DD/MM/YYYY') }
				</th>
				<th className = 'text-center'>{soli.solicitud_oficina.meses_renta}</th>
				<th className = 'text-center'>{soli.solicitud_oficina.metodo_pago.nombre}</th>
				<th className = 'text-center'>{ this.renderStatusLabel(soli) }</th>
				<th className = 'text-center'>{soli.user.email}</th>
				<th className = 'text-center'>{soli.user.info_personal !== null
					? ``
					: 'Sin datos'
				}</th>
				<th className = 'text-center'>
					<div className = 'btn-group'>
						<Link className = 'btn btn-primary btn-sm' to = {`/solicitudes/showOficina/${soli.id}`}>
							<FontAwesomeIcon icon = { faEye } />
						</Link>
					</div>
				</th>
			</tr>
		))
	}

	selectedPagination(e){
		console.log(e.selected)
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
		// return(
		// 	<nav aria-label='Page navigation'>
		// 		<ul className = 'pagination justify-content-center'>
		// 			{/* <li className = 'page-item'><a className = 'page-link'>Anterior</a></li>
		// 			{[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((e,i)=>
		// 				<li className = 'page-item'><a className = 'page-link'>{e}</a></li>
		// 			)}
		// 			<li className = 'page-item'><a className = 'page-link'>...</a></li>
		// 			<li className = 'page-item'><a className = 'page-link'>Siguiente</a></li> */}
		// 			<li className = 'page-item'><a className = 'page-link'>Anterior</a></li>
		// 				{ this.state.currentIndexPagination  }
		// 				{this.props.solicitudesPaginated.map((e,i) => (
		// 					<li className = {`page-item ${i == this.state.currentIndexPagination ? 'active' : ''}`}>
		// 						<a className = 'page-link'>{ i + 1 }</a>
		// 					</li>
		// 				))}
		// 			<li className = 'page-item'><a className = 'page-link'>Siguiente</a></li>
		// 		</ul>
		// 	</nav>
		// )
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
								<th className = 'text-center' scope = 'col'>Fecha a reservar</th>
								<th className = 'text-center' scope = 'col'>Meses de renta</th>
								<th className = 'text-center' scope = 'col'>Método de pago</th>
								<th className = 'text-center' scope = 'col'>Estado</th>
								<th className = 'text-center' scope = 'col'>Email usuario</th>
								<th className = 'text-center' scope = 'col'>Nombre usuario</th>
								<th className = 'text-center' scope = 'col'></th>
							</tr>
						</thead>
						<tbody>
							{ this.renderSolicitudesOficinaRow() }
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
