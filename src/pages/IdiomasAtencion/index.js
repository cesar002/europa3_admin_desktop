import React from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faPenAlt, faUndoAlt, faSave } from '@fortawesome/free-solid-svg-icons';

import Container from '../../components/pures/ContainerMaster';
import LoadingScreen from '../../components/pures/LoadingScreen';
import EmptyScreen from '../../components/pures/EmptyScreen';

import * as idiomasActions from '../../redux/actions/idiomasAtencionActions';

import Europa3Api from '../../api';

class IdiomasAtencion extends React.Component{
	constructor(props){
		super(props);

		this.renderLoading = this.renderLoading.bind(this);
		this.renderEmptyScreen = this.renderEmptyScreen.bind(this);
		this.addIdioma = this.addIdioma.bind(this);
		this.restoreIdioma = this.restoreIdioma.bind(this);
		this.updateIdioma = this.updateIdioma.bind(this);

		this.state = {
			idioma : '',
			registerLoading: false,
		}
	}

	restoreIdioma(id){
		this.props.disableEdit(id)
		this.props.restoreIdioma(id)
	}

	updateIdioma(idioma){
		if(!idioma.idioma){
			return;
		}

		this.props.enableUpdateIdioma(idioma.id)

		Europa3Api.updateIdiomaAtencion(idioma.id, idioma.idioma)
		.then(resp => this.props.backupIdiomas())
		.catch(err => {
			this.props.restoreIdioma(idioma.id)

			swal.fire({
				icon: 'error',
				text: 'Ocurrió un error',
				title: 'Hubo un error al actualizar el idioma',
			})
		})
		.finally(()=>{
			this.props.disableUpdateIdioma(idioma.id);
			this.props.restoreIdioma(idioma.id);
			this.props.disableEdit(idioma.id);
		})
	}

	renderLoading(){
		if(this.props.idiomasStatus.start){
			return <LoadingScreen mt = { 10 } text = 'Cargando idiomas...' />
		}
	}

	renderEmptyScreen(){
		if(this.props.idiomasStatus.finish && this.props.idiomasAtencion.length == 0){
			return <EmptyScreen mt = { 10 } text = 'No hay idiomas de atención registrados' />
		}
	}

	addIdioma(){
		if(!this.state.idioma){
			return
		}

		this.setState({
			registerLoading: true,
		})

		Europa3Api.registerIdiomaAtencion(this.state.idioma)
		.then(resp => {
			this.setState({
				registerLoading: false
			}, () => this.props.fetchIdiomasAtencion())
		})
		.catch(err => {
			swal.fire({
				icon: 	'error',
				title: 	'Ocurrió un error',
				text: 	'Hubó un error al agregar el idioma de atención',
			})
		})
		.finally(() => this.setState({ idioma: '' }));
	}

	render(){
		return(
			<Container title = 'Idiomas de atención'>
				<section className = 'mt-4'>
					<div className = 'row'
						style = {{ paddingLeft: '10rem' }}
					>
						<div className = 'col-6'>
							<input id = 'servicio' className = 'form-control'
								type = 'text'
								value = { this.state.idioma }
								onChange = { e => this.setState({ idioma: e.target.value }) }
								placeholder = 'Nombre del servicio'
								disabled = { this.state.registerLoading }
							/>
						</div>
						<div className = 'col-6'>
							<button className = 'btn btn-primary btn-sm'
								onClick = { this.addIdioma }
								disabled = { this.state.registerLoading }
							>
								{ !this.state.registerLoading &&
								<React.Fragment>
									<FontAwesomeIcon icon = { faPlusCircle } className = 'mr-2' />
									Agregar servicio
								</React.Fragment>
								}
								{ this.state.registerLoading && <div className="spinner-border spinner-border-sm text-light" role="status" />}
							</button>
						</div>
					</div>
					{this.props.idiomasAtencion.length > 0 && this.props.idiomasStatus.finish &&
					<section className = 'mt-5'
						style = {{ paddingLeft: '10rem' }}
					>
						<table className = 'table table-responsive'>
							<thead>
								<tr>
									<th scope = 'col'>#</th>
									<th scope = 'col'>Idioma de atención</th>
									<th scope = 'col'></th>
								</tr>
							</thead>
							<tbody>
								{this.props.idiomasAtencion.map((idm, i) => (
								<tr key = {idm.id}>
									<th scope = 'row'>{i+1}</th>
									<td>
										<input value = {idm.idioma} className = 'form-control'
											disabled = {!idm.edit || idm.update}
											onChange = {e => this.props.updateIdioma(idm.id, e.target.value)}
											style = {{ width: '30rem' }}
										/>
									</td>
									<td>
										{!idm.edit &&
										<button className = 'btn btn-primary btn-sm'
											onClick = { () => this.props.enableEdit(idm.id) }
										>
											<FontAwesomeIcon icon = { faPenAlt } />
										</button>
										}
										{idm.edit &&
										<React.Fragment>
											{idm.update && <div className="spinner-border text-success" />}
											{!idm.update &&
											<div className = 'btn-group btn-group-sm' role = 'group'>
												<button className = 'btn btn-warning btn-sm'
													onClick = { () => this.restoreIdioma(idm.id) }
												>
													<FontAwesomeIcon icon = {faUndoAlt} />
												</button>
												<button className = 'btn btn-success btn-sm'
													onClick = { () => this.updateIdioma(idm) }
												>
													<FontAwesomeIcon icon = { faSave } />
												</button>
											</div>
											}
										</React.Fragment>
										}
									</td>
								</tr>
								))}
							</tbody>
						</table>
					</section>
					}
				</section>
				{ this.renderLoading() }
				{ this.renderEmptyScreen() }
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	idiomasStatus: state.idiomasAtencionData.status.idiomasStatus,
	idiomasAtencion: state.idiomasAtencionData.idiomasAtencion,
})

const mapDispatchToProps = dispatch => ({
	fetchIdiomasAtencion(){
		dispatch(idiomasActions.startFetchIdiomasAtencion());
	},
	enableEdit(id){
		dispatch(idiomasActions.enableEditIdioma(id));
	},
	disableEdit(id){
		dispatch(idiomasActions.disableEditIdioma(id));
	},
	restoreIdioma(id){
		dispatch(idiomasActions.restoreIdiomaToIdiomas(id));
	},
	enableUpdateIdioma(id){
		dispatch(idiomasActions.enableUpdateIdioma(id))
	},
	disableUpdateIdioma(id){
		dispatch(idiomasActions.disableUpdateIdioma(id))
	},
	updateIdioma(id, idioma){
		dispatch(idiomasActions.updateIdiomaToIdiomas(id, idioma))
	},
	backupIdiomas(){
		dispatch(idiomasActions.backupIdiomas());
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(IdiomasAtencion);
