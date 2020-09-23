import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faPenAlt, faUndoAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';

import Container from '../../components/pures/ContainerMaster';
import LoadingScreen from '../../components/pures/LoadingScreen';
import EmptyScreen from '../../components/pures/EmptyScreen';

import * as serviciosActions from '../../redux/actions/serviciosActions';
import Europa3Api from '../../api';


class Servicios extends React.Component{
	constructor(props) {
		super(props);

		this.renderLoadingScreen = this.renderLoadingScreen.bind(this);
		this.renderEmptyScreen = this.renderEmptyScreen.bind(this);
		this.addServicio = this.addServicio.bind(this);
		this.updateServicio = this.updateServicio.bind(this);
		this.restoreServicio = this.restoreServicio.bind(this);

		this.state = {
			servicio: '',
		}
	}

	addServicio(){
		if(!this.state.servicio){
			return
		}

		Europa3Api.registerServicio(this.state.servicio)
		.then(resp =>  this.props.fetchServicios() )
		.catch(err => {
			swal.fire({
				icon: 'error',
				title: 'Ocurrió un error',
				text: 'Hubo un error al agregar el servicio, intentelo de nuevo'
			})
		})
		.finally(() => this.setState({ servicio: '' }))
	}

	updateServicio(servicio){
		if(!servicio.servicio){
			return;
		}

		this.props.enableUpdateServicio(servicio.id)

		Europa3Api.updateServicio(servicio.id, servicio.servicio)
		.then(resp => this.props.backupServicios())
		.catch(err => {
			this.props.restoreServicio(servicio.id);

			swal.fire({
				icon: 'error',
				title: 'Ocurrió un error',
				text: `Hubo un error al agregar el servicio ${servicio}`
			})

		})
		.finally(() =>{
			this.props.disableUpdateServicio(servicio.id)
			this.props.disableEdit(servicio.id)
		})
	}

	restoreServicio(id){
		this.props.disableEdit(id);
		this.props.restoreServicio(id);
	}

	renderLoadingScreen(){
		if(this.props.servicioStatus.start){
			return <LoadingScreen text = 'Cargando servicios...' mt = { 10 } />
		}
	}

	renderEmptyScreen(){
		if(this.props.servicios.length == 0 && this.props.servicioStatus.finish){
			return <EmptyScreen text = 'Sin servicios registrados' mt = { 10 } />
		}
	}

	render(){
		return(
			<Container title = 'Servicios'>
				<section className = 'mt-4'>
					<div className = 'row'
						style = {{ paddingLeft: '10rem' }}
					>
						<div className = 'col-6'>
							<input id = 'servicio' className = 'form-control'
								type = 'text'
								value = { this.state.servicio }
								onChange = { e => this.setState({ servicio: e.target.value }) }
								placeholder = 'Nombre del servicio'
							/>
						</div>
						<div className = 'col-6'>
							<button className = 'btn btn-primary btn-sm'
								onClick = { this.addServicio }
							>
								<FontAwesomeIcon icon = { faPlusCircle } className = 'mr-2' />
								Agregar servicio
							</button>
						</div>
					</div>
					{ this.props.servicios.length > 0 && this.props.servicioStatus.finish &&
					<section className = 'mt-5'
						style = {{ paddingLeft: '15rem' }}
					>
						<table className = 'table table-responsive'>
							<thead>
								<tr>
									<th scope = 'col'>#</th>
									<th scope = 'col'>Servicio</th>
									<th scope = 'col'></th>
								</tr>
							</thead>
							<tbody>
								{ this.props.servicios.map((s, i)=> (
								<tr key = { s.id }>
									<th scope = 'row'>{i+1}</th>
									<td>
										<input value = {s.servicio}
											className = 'form-control' disabled = { !s.edit || s.update }
											onChange = {e => this.props.updateServicio(s.id, e.target.value)}
											style = {{ width: '30rem' }}
										/>
									</td>
									<td>
										{!s.edit &&
										<button className = 'btn btn-primary btn-sm'
											onClick = { () => this.props.enableEdit(s.id) }
										>
											<FontAwesomeIcon icon = { faPenAlt } />
										</button>
										}
										{s.edit &&
											<React.Fragment>
												{s.update && <div className="spinner-border text-success" />}
												{!s.update &&
												<div className = 'btn-group btn-group-sm' role = 'group'>
													<button className = 'btn btn-warning btn-sm'
														onClick = { () => this.restoreServicio(s.id) }
													>
														<FontAwesomeIcon icon = {faUndoAlt} />
													</button>
													<button className = 'btn btn-success btn-sm'
														onClick = { () => this.updateServicio(s) }
													>
														<FontAwesomeIcon icon = { faSave } />
													</button>
												</div>
												}
											</React.Fragment>
										}
									</td>
								</tr>
								))
							}
							</tbody>
						</table>
					</section>
					}
				</section>
				{ this.renderLoadingScreen() }
				{ this.renderEmptyScreen() }
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	servicioStatus: state.serviciosData.status.serviciosStatus,
	servicios: state.serviciosData.servicios,
})

const mapDispatchToProps = dispatch => ({
	fetchServicios(){
		dispatch(serviciosActions.startFetchServicios());
	},
	enableEdit(id){
		dispatch(serviciosActions.enableEditServicio(id));
	},
	disableEdit(id){
		dispatch(serviciosActions.disableEditServicio(id))
	},
	updateServicio(id, servicio){
		dispatch(serviciosActions.updateServicioToServicio(id, servicio));
	},
	restoreServicio(id){
		dispatch(serviciosActions.restoreServicioToServicio(id));
	},
	backupServicios(){
		dispatch(serviciosActions.backupServicios());
	},
	enableUpdateServicio(id){
		dispatch(serviciosActions.enableUpdateServicio(id))
	},
	disableUpdateServicio(id){
		dispatch(serviciosActions.diableUpdateServicio(id))
	},
})


export default connect(mapStateToProps, mapDispatchToProps)(Servicios);
