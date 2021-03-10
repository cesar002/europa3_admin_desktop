import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import moment from 'moment'

import { startFetchSolicitudesVisita } from '../../redux/actions/solicitudesAction'

import Container from '../../components/pures/ContainerMaster';
import Loading from '../../components/pures/LoadingScreen';

import Europa3Api from '../../api';

class SolicitudesVisita extends Component {

	constructor(props){
		super(props);

		this.renderTable = this.renderTable.bind(this)
		this.deleteSolicitud = this.deleteSolicitud.bind(this)
		this.revisarSolicitud = this.revisarSolicitud.bind(this)
	}

	componentDidMount(){
		this.props.fetchSolicitudes();
	}

	async deleteSolicitud(id){
		try {
			const result = await Swal.fire({
				title: 'Confirmación',
				text: "¿Desea eliminar esta solicitud de visita?",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Si',
				cancelButtonText: 'No',
			})

			if(!result.isConfirmed){ return; }

			const resp = await Europa3Api.deleteSolicitudvisita(id)
			if(resp.status !== 'success'){ throw resp.data }

			this.props.fetchSolicitudes();
		} catch (error) {
			Swal.fire('Error','Ocurrió un error al eliminar la solicitud', 'error')
		}
	}

	async revisarSolicitud(id){
		try {
			const resp = await Europa3Api.marcarSolicitudVisita(id)
			if(resp.status !== 'success'){ throw resp.data }

			this.props.fetchSolicitudes();
		} catch (error) {
			Swal.fire('Error','Ocurrió un error al marcar la solicitud', 'error')
		}
	}

	renderTable(){
		return(
			<div className = 'row my-4 px-3'>
				<div className = 'col-12'>
					<div className = 'card'>
						<div className = 'card-header'>
							<h3 className = 'card-title'>
								Solicitudes
							</h3>
						</div>
						<div className = 'card-body'>
							<div className = 'table-responsive'>
								<table className = 'table'>
									<thead>
										<tr>
											<th>Nombre</th>
											<th>Correo</th>
											<th>Teléfono</th>
											<th>Comentario</th>
											<th>Fecha de solicitud</th>
											<th>Estado</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{ this.props.solicitudes.map(s =>
										<tr key = { s.id }>
											<td>{ s.nombre }</td>
											<td>{ s.email }</td>
											<td>{ s.telefono }</td>
											<td>{ s.comentario }</td>
											<td>{ moment(s.created_at).format('DD/MM/YYYY') }</td>
											<td>{ s.activo ? 'No revisado' : 'Revisado' }</td>
											<td className = 'btn-group'>
												{ s.activo &&
												<button className = 'btn btn-success btn-sm'
													onClick = { ()=>this.revisarSolicitud(s.id) }
												>
													<FontAwesomeIcon icon = { faCheck } />
												</button>
												}
												<button className = 'btn btn-danger btn-sm'
													onClick = { ()=>this.deleteSolicitud(s.id) }
												>
													<FontAwesomeIcon icon = { faTrash } />
												</button>
											</td>
										</tr>
										) }
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	render() {
		return (
			<React.Fragment>
				<Container title = 'Solicitudes de visita'>
					{ this.props.solicitudesStatus.start &&
					<Loading mt = { 15 } />
					}
					{ this.props.solicitudesStatus.success &&
						this.renderTable()
					}
				</Container>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => ({
	solicitudes: state.solicitudesData.solicitudesVisita,
	solicitudesStatus: state.solicitudesData.status.solicitudesVisita,
})

const mapDispatchToProps = dispatch => ({
	fetchSolicitudes(){
		dispatch(startFetchSolicitudesVisita())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(SolicitudesVisita)
