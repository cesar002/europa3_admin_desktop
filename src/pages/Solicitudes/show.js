import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import fileDownload from 'js-file-download';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faEnvelopeOpenText, faLockOpen } from '@fortawesome/free-solid-svg-icons';

import * as solicitudesActions from '../../redux/actions/solicitudesAction';

import Loading from '../../components/pures/LoadingScreen';
import Container from '../../components/pures/ContainerMaster';
import InformacionSolicitud from '../../components/pures/InformacionSolicitud';
import InfoPersonalSolicitud from '../../components/pures/InformacionPersonalSolicitud';
import InfoFiscalSolicitud from '../../components/pures/InformacionFiscalSolicitud';
import InfoMoralSolicitud from '../../components/pures/InformacionMoralSolicitud';
import DocumentosSolicitud from '../../components/pures/DocumentosSolicitud';
import InformacionPagos from '../../components/pures/InformacionPagos';

import Europa3Api from '../../api';


class ShowSolicitud extends React.Component{
	constructor(props){
		super(props)

		this.fetchSolicitudshow = this.fetchSolicitudshow.bind(this);
		this.setTabIndex = this.setTabIndex.bind(this);
		this.renderTab = this.renderTab.bind(this);
		this.renderBody = this.renderBody.bind(this);
		this.invalidateDocument = this.invalidateDocument.bind(this);
		this.validateDocument = this.validateDocument.bind(this);
		this.downloadDocument = this.downloadDocument.bind(this);
		this.autorizarSolicitud = this.autorizarSolicitud.bind(this);
		this.noAutorizarSolicitud = this.noAutorizarSolicitud.bind(this);

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

	async invalidateDocument(id){
		this.props.startFetchInvalidateDocument(id);

		const resp = await Europa3Api.invalidarDocumento(id, this.props.accessToken);

		if(resp.status !== 'success'){
			this.props.finishFetchFailInvalidateDocument(id);
			swal.fire({
				title:'Error',
				text: 'Ocurrió un error al invalidar el documento',
				icon: 'error',
			})
			return;
		}

		swal.fire({
			title:'Correcto',
			text: 'Documento invalidado con éxito',
			icon: 'success',
		})
		this.props.finishFetchSuccessInvalidateDocument(id);
		this.props.markDocumentToInvalidate(id);

	}

	async validateDocument(id){
		this.props.startFetchValidateDocument(id);

		const resp = await Europa3Api.validarDocumento(id, this.props.accessToken);

		if(resp.status !== 'success'){
			this.props.finishFetchFailValidateDocument(id);
			swal.fire({
				title:'Error',
				text: 'Ocurrió un error al validar el documento',
				icon: 'error',
			})
			return;
		}

		swal.fire({
			title:'Correcto',
			text: 'Documento validado con éxito',
			icon: 'success',
		})
		this.props.finishFetchSuccessValidateDocument(id);
		this.props.markDocumentToValidate(id);
	}

	async downloadDocument(document){
		try {
			const data = await Europa3Api.donwloadDocument(document.id, this.props.accessToken)

			if(!data){
				swal.fire({
					title: 'Error',
					text: 'Ocurrió un error en la descarga del archivo',
					icon: 'error'
				})
				return;
			}

			fileDownload(data, `${document.tipo_documento.documento}.${document.tipo_archivo}`);
			swal.fire({ title: 'Completado', text: 'Descarga completa', icon: 'success' })
		} catch (error) {
			console.error(error);
			swal.fire({
				title: 'Error',
				text: 'Ocurrió un error al guardar el archivo',
				icon: 'error'
			})
		}
	}

	noAutorizarSolicitud(){
		swal.fire({
			title: 'Confirmación',
			html: '¿Desea <strong>no autorizar</strong> esta solicitud?',
			showDenyButton: true,
			confirmButtonText: 'Si',
			denyButtonText: 'No',
		})
		.then(result => {

		})
	}

	autorizarSolicitud(){
		swal.fire({
			title: 'Confirmación',
			html: '¿Desea <strong>autorizar</strong> esta solicitud?',
			showDenyButton: true,
			confirmButtonText: 'Si',
			denyButtonText: 'No',
		}).then(result =>{
			if(result.isConfirmed){
				this.props.autorizar(this.props.solicitud.id)
			}
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
				{ this.props.solicitud.fechas_pago.length > 0 &&
				<li className = 'nav-item'>
					<a className = {`nav-link ${this.state.tabIndex == 5? 'active' : ''}`}
						onClick = { () => this.setTabIndex(5) }
						style = {{ cursor: 'pointer' }}
					>
						Pagos
					</a>
				</li>
				}
			</ul>
		)
	}

	renderBody(){
		return(
			<React.Fragment>
				{ this.renderTab() }
				<div className = 'card mt-5'>
					<div className = 'card-body'>
						<div className = 'd-flex'>
							{(this.props.autorizarStatus.start || this.props.noAutorizarStatus.start) &&
							<div className = 'spinner-border text-primary' />
							}
							{(!this.props.autorizarStatus.start && !this.props.noAutorizarStatus.start) &&
							<React.Fragment>
								{ this.props.solicitud.estado_id == 1  &&
								<React.Fragment>
									<button className = 'btn btn-primary btn-sm'
										onClick = { this.autorizarSolicitud }
									>
										<FontAwesomeIcon icon = { faCheck } className = 'mx-2' />
										Autorizar solicitud
									</button>

									<button className = 'btn btn-primary btn-sm'
										onClick = { this.noAutorizarSolicitud }
									>
										<FontAwesomeIcon icon = { faTimes } className = 'mx-2' />
										No autorizar solicitud
									</button>
								</React.Fragment>
								}
								{ this.props.solicitud.estado_id == 7 &&
								<button className = 'btn btn-primary btn-sm'>
									<FontAwesomeIcon icon = { faLockOpen } className = 'mx-2' />
									Finalizar solicitud
								</button>
								}
							</React.Fragment>
							}
						</div>
					</div>
				</div>
				<div className = 'card shadow mt-4'>
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
						{ this.state.tabIndex == 4 &&
						<DocumentosSolicitud
							documentos = { this.props.solicitud.documentos }
							validateHandle = { this.validateDocument }
							invalidateHandle = { this.invalidateDocument }
							downloadHandle = { this.downloadDocument }
						/>
						}
						{ this.state.tabIndex == 5 &&
						<InformacionPagos
							pagos = { this.props.solicitud.fechas_pago }
						/>
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
	accessToken: state.userData.accessToken.token,
	autorizarStatus: state.solicitudesData.status.autorizacion,
	noAutorizarStatus: state.solicitudesData.status.noAutorizacion,
})

const mapDispatchToProps = dispatch => ({
	autorizar(id){
		dispatch(solicitudesActions.startFetchSolicitudAutorizar(id))
	},
	fetchSolicitud(id){
		dispatch(solicitudesActions.startFetchSolicitudOficinaById(id));
	},
	clearSolicitud(){
		dispatch(solicitudesActions.clearSolicitudOficina());
	},
	startFetchValidateDocument(id){
		dispatch(solicitudesActions.startFetchSolicitudDocumentValidate(id));
	},
	finishFetchSuccessValidateDocument(id){
		dispatch(solicitudesActions.finishFetchSolicitudDocumentValidateSuccess(id));
	},
	finishFetchFailValidateDocument(id){
		dispatch(solicitudesActions.finishFetchSolicitudDocumentValidateFail(id));
	},
	markDocumentToValidate(id){
		dispatch(solicitudesActions.setSolicitudDocumentValidate(id));
	},
	startFetchInvalidateDocument(id){
		dispatch(solicitudesActions.startFetchSolicitudDocumentInvalidate(id));
	},
	finishFetchSuccessInvalidateDocument(id){
		dispatch(solicitudesActions.finishFetchSolicitudInvalidateSuccess(id));
	},
	finishFetchFailInvalidateDocument(id){
		dispatch(solicitudesActions.finishFetchSolicitudInvalidateFail(id));
	},
	markDocumentToInvalidate(id){
		dispatch(solicitudesActions.setSolicitudDocumentInvalidate(id));
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShowSolicitud))
