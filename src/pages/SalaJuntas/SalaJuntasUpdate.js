import React from 'react';
import { connect } from 'react-redux';
import { Formik, FieldArray } from 'formik';
import swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import Container from '../../components/pures/ContainerMaster';
import ThumbnailPreview from '../../components/pures/ThumbnailImagePreview';
import ThumbnailPreviewLocal from '../../components/pures/ThumbnailImageLocalPreview';

import * as salaJuntasActions from '../../redux/actions/salaJuntasActions';

import Europa3Api from '../../api';

class SalaJuntasUpdate extends React.Component{
	constructor(props){
		super(props);

		this.goToTab = this.goToTab.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.filterMobiliarioByEdificio = this.filterMobiliarioByEdificio.bind(this);
		this.addServicio = this.addServicio.bind(this);
		this.addMobiliario = this.addMobiliario.bind(this);
		this.renderMobiliario = this.renderMobiliario.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.renderMobiliario = this.renderMobiliario.bind(this);
		this.renderImageUpdate = this.renderImageUpdate.bind(this);
		this.addNewImages = this.addNewImages.bind(this);
		this.removeImageOficina = this.removeImageOficina.bind(this);
		this.removeNewImage = this.removeNewImage.bind(this);
		this.updateImages = this.updateImages.bind(this);
		this.updateInfo = this.updateInfo.bind(this);

		this.state = {
			isEdit: false,
			tabIndex: 0,
			currentServicioId: 0,
			currentMobiliarioId: 0,
			mobiliario: [],
			mobiliarioSala: [],
			newImages: null,
			deletedImages: [],
			updatingImages: false,
		}
	}

	componentDidMount(){
		const edId = this.props.salaJuntas.edificio.id;
		const mob = this.props.mobiliario.filter(m => m.id == edId);

		this.setState({
			mobiliario: mob,
			mobiliarioSala: this.props.salaJuntas.mobiliario,
		})
	}

	updateCantidadMobiliario(id, cantidad){
		this.setState({
			mobiliarioSala: this.state.mobiliarioSala.map(m => m.id == id ? {...m, cantidad} : m)
		})
	}

	renderMobiliario(){
		return(
			<React.Fragment>
				<div className = 'form-row'>
					<div className = 'form-inline mb-3'>
						<label htmlFor = 'mobiliario'>Mobiliario:</label>
						<select id = 'mobiliario' className = {`form-control mx-3 ${this.props.mobiliarioOficinaError ? 'is-invalid' : ''}`}
							style = {{ minWidth: '10rem' }}
							value = {this.state.currentMobiliarioId}
							onChange = { e => this.setState({ currentMobiliarioId: Number(e.target.value) }) }
							disabled = { !this.state.isEdit }
						>
							<option value = {0}>Seleccione mobiliario</option>
							{this.state.mobiliario.map(m => (
							<option value = {m.id} key = {m.id}>{m.nombre}</option>
							))}
						</select>
						{this.props.mobiliarioOficinaError && <span className = 'invalid-feedback'>{this.props.mobiliarioOficinaError}</span>}
						<button type = 'button' className = 'btn btn-primary btn-sm' onClick = { this.addMobiliario }
							disabled = { !this.state.isEdit }
						>
							Agregar
						</button>
					</div>
				</div>
				{ this.state.mobiliarioSala.length > 0  &&
				<div className = 'row d-flex justify-content-center'>
					<div className = 'col'>
						<table className = 'table'>
							<thead>
								<tr>
									<th scope = 'col'>Mueble</th>
									<th scope = 'col'>Imagen</th>
									<th scope = 'col'>Cantidad</th>
									<th scope = 'col'></th>
								</tr>
							</thead>
							<tbody>
								{this.state.mobiliarioSala.map(m => (
									<tr key = {m.id}>
										<th>{m.nombre}</th>
										<th><img alt = {m.nombre} src = {m.image} style = {{ width: '40px', height: '40px' }} /></th>
										<th className = 'input-group-sm'>
											<input type = 'number'
												className = 'form-control'
												value = {m.cantidad}
												onChange = { e => this.updateCantidadMobiliario(m.id, Number(e.target.value))}
												disabled = { !this.state.isEdit }
											/>
										</th>
										<th>
											<button className = 'btn btn-danger btn-sm' type = 'button'
												disabled = { !this.state.isEdit }
											>
												<FontAwesomeIcon icon = { faTrashAlt } />
											</button>
										</th>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				}
			</React.Fragment>
		)
	}

	goToTab(i){
		this.setState({
			tabIndex: i
		})
	}

	filterMobiliarioByEdificio(e){
		const id = Number(e.target.value);
		this.setState({
			mobiliario: this.props.mobiliario.filter(m => m.edificio.id == id),
			mobiliarioSala: [],
		})
	}

	validateForm(values){
		const errors = {}

		if(values.edificio_id == 0){
			errors.edificio_id = 'Campo obligatorio'
		}

		if(values.size_id == 0){
			errors.size_id = 'Campo obligatorio'
		}

		if(values.tipo_tiempo_id == 0){
			errors.tipo_tiempo_id = 'Campo obligatorio'
		}

		if(values.nombre == ''){
			errors.nombre = 'Campo obligatorio'
		}

		if(values.size_dimension == ''){
			errors.size_dimension = 'Campo obligatorio'
		}

		if(values.capacidad_recomendada == ''){
			errors.capacidad_recomendada = 'Campo obligatorio'
		}else if(Number(values.capacidad_recomendada) <= 0){
			errors.capacidad_recomendada = 'La capacidad recomendada debe ser minimo 1'
		}

		if(values.capacidad_maxima == ''){
			errors.capacidad_maxima = 'Campo obligatorio'
		}else if(Number(values.capacidad_maxima) < Number(values.capacidad_recomendada)){
			errors.capacidad_maxima = 'La capacidad maxima debe ser igual o mayor a la capacidad recomendada'
		}

		if(values.precio == ''){
			errors.precio = 'Campo obligatorio'
		}else if(Number(values.precio) == 0){
			errors.precio = 'El precio debe ser mayor a 0'
		}

		if(values.servicios.length == 0){
			errors.servicios = 'Debe de haber al menos un servicio'
		}

		if(values.descripcion == ''){
			errors.descripcion = 'Campo obligatorio'
		}

		return errors;
	}

	addMobiliario(){
		const { currentMobiliarioId, mobiliarioSala } = this.state

		if(mobiliarioSala.some(m => m.id == currentMobiliarioId) || currentMobiliarioId == 0){
			return;
		}

		const mobiliario = this.state.mobiliario.find(m => m.id == currentMobiliarioId);

		this.setState({
			mobiliarioSala: [...this.state.mobiliarioSala, {...mobiliario, cantidad: 1}]
		})
	}

	addServicio(servicios = [], arrayHelpers){
		const { currentServicioId } = this.state

		if(servicios.some(s => s.id == currentServicioId) || currentServicioId == 0){
			return;
		}

		const servicio = this.props.servicios.find(s => s.id == currentServicioId)
		arrayHelpers.push({ ...servicio });
	}

	toggleEdit(){
		const { isEdit } = this.state;
		this.setState({
			isEdit: !isEdit,
		})
	}

	addNewImages(e){
		const images = Array.from(e.target.files);
		this.setState({
			newImages: images,
		})
	}

	removeImageOficina(image){
		this.setState({
			deletedImages: [...this.state.deletedImages, image]
		}, () => this.props.removeImage(image.id) )
	}

	removeNewImage(name){
		this.setState({
			newImages: this.state.newImages.filter(e => e.name !== name)
		})
	}

	updateImages(){
		if(!this.state.newImages && this.state.deletedImages.length == 0){
			return;
		}

		if(this.props.salaJuntas.images.length == 0){
			return;
		}

		this.setState({
			updatingImages: true,
		})

		const updateData = new FormData();

		if(this.state.newImages){
			this.state.newImages.forEach(file => {
				updateData.append('new_images[]', file)
			})
		}

		if(this.state.deletedImages.length > 0){
			this.state.deletedImages.forEach(image => {
				updateData.append('images_delete[]', image.id)
			})
		}

		Europa3Api.updateImagesSalaJuntas(this.props.salaJuntas.id, updateData)
		.then(resp => {

			this.setState({
				deletedImages: [],
				newImages: null,
			})

			this.props.fetchImagenesSala(this.props.salaJuntas.id);
			this.props.fetchSalaJuntas();
			this.inputImages.value = '';

			swal.fire({
				icon: 'success',
				title: 'Correcto',
				text: 'Imagenes actualizadas con éxito'
			})

		})
		.catch(err => {
			console.error(err)
			swal.fire({
				icon: 'error',
				title: 'Ocurrió un error',
				text: 'Hubo un error al actualizar las imagenes de la sala de juntas'
			})
		})
		.finally(()=>{
			this.setState({
				updatingImages: false,
			})
		})

	}

	renderImageUpdate(){
		if(this.state.tabIndex == 1){
			return(
				<div className = 'container mt-4 px-5'>
					<div className = 'row'>
						<div className = 'col-12'>
							<label htmlFor = 'newImages'>Agregar imagenes</label>
							<input className = 'form-control-file'
								disabled = { !this.state.isEdit }
								multiple
								type = 'file'
								name = 'images[]'
								accept='image/x-png,image/gif,image/jpeg'
								ref = {el => this.inputImages = el}
								id = 'newImages'
								onChange = { this.addNewImages }
							/>
						</div>
					</div>
					<div className = 'row mt-4'>
						{this.props.imagenesStatus.start &&
						<div className = 'col d-flex justify-content-center my-5'>
							<div className="spinner-border text-primary" role="status" />
						</div>
						}
						{!this.props.imagenesStatus.start && this.props.salaJuntas.images.map(img => (
						<div className = 'col-6 col-sm-3' key = {img.id}>
							{this.state.isEdit &&
							<button type = 'button' className = 'btn btn-danger btn-sm' style = {{ position: 'absolute' }}
								disabled = { this.state.updatingImages }
								onClick = { ()=> this.removeImageOficina(img) }
							>
								<FontAwesomeIcon icon = { faTrashAlt } />
							</button>
							}
							<ThumbnailPreview uri = { img.url } maxHeight = { 200 } maxWidth = { 200 } />
						</div>
						))
						}
						{ this.state.newImages && this.state.newImages.map(img => (
						<div className = 'col-6 col-sm-3' key = {img.name}>
							{this.state.isEdit &&
							<button type = 'button' className = 'btn btn-danger btn-sm float-right' style = {{ position: 'absolute' }}
								disabled = { this.state.updatingImages }
								onClick = { () => this.removeNewImage(img.name) }
							>
								<FontAwesomeIcon icon = { faTrashAlt } />
							</button>
							}
							<ThumbnailPreviewLocal file = { img } maxHeight = { 200 } maxWidth = { 200 } />
						</div>
						)) }
					</div>
					<div className = 'row mt-3'>
						<button className = 'btn btn-primary btn-lg btn-block'
							disabled = { !this.state.isEdit || this.state.updatingImages }
							onClick = { this.updateImages }
						>
							{ !this.state.updatingImages && 'Actualizar imagenes'}
							{ this.state.updatingImages && <div className="spinner-border text-light" role="status" /> }
						</button>
					</div>
				</div>
			)
		}
	}

	updateInfo(values, setSubmitting){
		const serviciosIds = values.servicios.map(s => s.id);
		const mobiliarioIds = [];
		this.state.mobiliarioSala.forEach(m => {
			for (let i = 0; i < m.cantidad; i++) {
				mobiliarioIds.push(m.id)
			}
		})

		const data = {
			...values,
			servicios: serviciosIds,
			mobiliario: mobiliarioIds,
		}

		Europa3Api.updateSalaJuntas(this.props.salaJuntas.id, data)
		.then(resp => {
			this.props.fetchSalaJuntas();
			swal.fire({
				icon: 'success',
				title: 'Correcto',
				text: 'Información actualizada con éxtio',
			});

			this.setState({
				isEdit: false,
			})
		})
		.catch(err => {
			console.error(err)
			swal.fire({
				icon: 'error',
				title: 'Ocurrió un error',
				text: 'Hubo un error al intentar actualizar los datos',
			})
		})
		.finally(() => setSubmitting(false))
	}

	renderFormUpdate(){
		if(this.state.tabIndex == 0){
			return(
				<Formik
					initialValues = {{
						edificio_id: this.props.salaJuntas.edificio.id,
						size_id: this.props.salaJuntas.size_tipo.id,
						tipo_tiempo_id: this.props.salaJuntas.tipo_renta.id,
						nombre: this.props.salaJuntas.nombre,
						descripcion: this.props.salaJuntas.descripcion,
						size_dimension: this.props.salaJuntas.dimension,
						capacidad_recomendada: this.props.salaJuntas.capacidad.recomendada,
						capacidad_maxima: this.props.salaJuntas.capacidad.maxima,
						precio: this.props.salaJuntas.precio,
						servicios: this.props.salaJuntas.servicios,
					}}
					validate = { values => this.validateForm(values) }
					onSubmit = { (values, { setSubmitting }) => this.updateInfo(values, setSubmitting) }
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
					})=>(
					<form onSubmit = { handleSubmit }>
						<div className = 'form-row'>
							<div className = 'form-group col-12 col-sm-6'>
								<label htmlFor = 'edificio'>Edificio</label>
								<select
									className = {`form-control ${errors.edificio_id && touched.edificio_id ? 'is-invalid' : ''}`}
									id = 'edificio'
									name = 'edificio_id'
									value = {values.edificio_id}
									style = {{minWidth: '10rem' }}
									disabled = { !this.state.isEdit }
									onChange = { e => {
										this.filterMobiliarioByEdificio(e);
										handleChange(e);
									}}
									onBlur = { handleBlur }
								>
									<option value = {0}>Seleccione un edificio</option>
									{this.props.edificios.map(e => (
									<option key = {e.id} value = {e.id}>{e.nombre}</option>
									))}
								</select>
								{ errors.edificio_id &&<div className = 'invalid-feedback'>{errors.edificio_id}</div> }
							</div>
							<div className = 'form-group col-12 col-sm-6'>
								<label htmlFor = 'size-oficina'>Tamaño de oficina</label>
								<select
									className = {`form-control ${errors.size_id && touched.size_id ? 'is-invalid' : ''}`}
									id = 'size-oficina'
									name = 'size_id'
									value = {values.size_id}
									style = {{minWidth: '10rem' }}
									disabled = { !this.state.isEdit }
									onChange = { handleChange }
									onBlur = { handleBlur }
								>
									<option value = {0}>Seleccione el tamaño</option>
									{this.props.oficinasSizes.map(o => (
									<option key = {o.id} value = {o.id} >{o.size_name}</option>
									))}
								</select>
								{ errors.size_id && <div className = 'invalid-feedback'>{errors.size_id}</div> }
							</div>
						</div>
						<div className = 'form-group'>
							<label htmlFor = 'tiempo'>Tipo de tiempo de renta</label>
							<select id = 'tiempo'
								className = {`form-control ${errors.tipo_tiempo_id && touched.tipo_tiempo_id ? 'is-invalid' : ''}`}
								value = { values.tipo_tiempo_id }
								name = 'tipo_tiempo_id'
								disabled = { !this.state.isEdit }
								onChange = { handleChange }
								onBlur = { handleBlur }
							>
								<option value = {0}>Seleccione una opción</option>
								{this.props.tipoTiempos.map(m => (
								<option key = {m.id} value = {m.id}>{m.tiempo}</option>
								))}
							</select>
							{errors.tipo_tiempo_id && <div className = 'invalid-feedback'>{errors.tipo_tiempo_id}</div>}
						</div>
						<div className = 'form-group'>
							<label htmlFor = 'sala-juntas'>Nombre de la sala de juntas</label>
							<input id = 'sala-juntas' type = 'text'
								className = {`form-control ${errors.nombre && touched.nombre ? 'is-invalid' : ''}`}
								value = { values.nombre }
								name = 'nombre'
								disabled = { !this.state.isEdit }
								onChange = { handleChange }
								onBlur = { handleBlur }
							/>
							{ errors.nombre && <div className = 'invalid-feedback'>{errors.nombre}</div> }
						</div>
						<div className = 'form-group'>
							<label htmlFor = 'descripcion'>Descripción</label>
							<textarea id = 'descripcion' rows = { 4 }
								className = {`form-control ${errors.descripcion && touched.descripcion ? 'is-invalid' : ''}`}
								value = { values.descripcion }
								disabled = { !this.state.isEdit }
								name = 'descripcion'
								onChange = { handleChange }
								onBlur = { handleBlur }
							/>
							{errors.descripcion && <div className = 'invalid-feedback'>{errors.descripcion}</div>}
						</div>
						<div className = 'form-group'>
							<label htmlFor = 'dimensiones'>Dimensiones</label>
							<input id = 'dimensiones'
								className = {`form-control ${errors.size_dimension && touched.size_dimension ? 'is-invalid' : ''}`}
								value = { values.size_dimension }
								name = 'size_dimension'
								disabled = { !this.state.isEdit }
								onChange = { handleChange }
								onBlur = { handleBlur }
								style = {{ maxWidth: '10rem' }}
							/>
							{errors.size_dimension && <div className = 'invalid-feedback'>{errors.size_dimension}</div>}
						</div>
						<div className = 'form-row'>
							<div className = 'form-group col-12 col-sm-6'>
								<label htmlFor = 'c-r'>Capacidad recomendada</label>
								<input id = 'c-r' type = 'number'
									className = {`form-control ${errors.capacidad_recomendada && touched.capacidad_recomendada ? 'is-invalid' : ''}`}
									value = {values.capacidad_recomendada}
									name = 'capacidad_recomendada'
									disabled = { !this.state.isEdit }
									onChange = {handleChange}
									onBlur = {handleBlur}
								/>
								{errors.capacidad_recomendada && <div className = 'invalid-feedback'>{errors.capacidad_recomendada}</div>}
							</div>
							<div className = 'form-group col-12 col-sm-6'>
								<label htmlFor = 'c-m'>Capacidad máxima</label>
								<input id = 'c-m' type = 'number'
									className = {`form-control ${errors.capacidad_maxima && errors.capacidad_maxima ? 'is-invalid' : ''}`}
									value = {values.capacidad_maxima}
									name = 'capacidad_maxima'
									disabled = { !this.state.isEdit }
									onChange = {handleChange}
									onBlur = {handleBlur}
								/>
								{errors.capacidad_maxima && <div className = 'invalid-feedback'>{errors.capacidad_maxima}</div>}
							</div>
						</div>
						<div className = 'form-group'>
							<label htmlFor = 'precio'>Precio</label>
							<input id = 'precio' className = {`form-control ${errors.precio && touched.precio ? 'is-invalid' : ''}`}
								type = 'number'
								name = 'precio'
								value = { values.precio }
								onChange = { handleChange }
								onBlur = { handleBlur }
								style = {{ maxWidth: '10rem' }}
								disabled = { !this.state.isEdit }
							/>
							{errors.precio && <div className = 'invalid-feedback'>{errors.precio}</div>}
						</div>
						<FieldArray
							name = 'servicios'
							render = {arrayHelpers =>(
								<React.Fragment>
									<div className = 'form-row'>
										<div className = 'form-inline mb-3 mr-3'>
											<label htmlFor = 'servicios'>Servicios</label>
											<select id = 'servicios'
												className = {`form-control ml-3 ${errors.servicios && touched.servicios ? 'is-invalid' : ''}`}
												value = { this.state.currentServicioId }
												disabled = { !this.state.isEdit }
												onChange = { e => this.setState({currentServicioId: Number(e.target.value)}) }
											>
												<option value = {0}>Seleccione un servicio</option>
												{this.props.servicios.map(s => (
												<option key = {s.id} value = {s.id}>{s.servicio}</option>
												))}
											</select>
											{errors.servicios && <div className = 'invalid-feedback'>{errors.servicios}</div>}
											<button type = 'button' className = 'btn btn-primary btn-sm ml-3'
												onClick = { () => this.addServicio(values.servicios, arrayHelpers) }
												disabled = { !this.state.isEdit }
											>
												Agregar
											</button>
										</div>
									</div>
									{values.servicios.length > 0 &&
									<div className = 'row d-flex justify-content-center'>
										<div className = 'col'>
											<table className = 'table'>
												<thead>
													<tr>
														<th scope = 'col'>Servicios</th>
														<th scope = 'col'></th>
														<th scope = 'col'></th>
													</tr>
												</thead>
												<tbody>
													{values.servicios.map((servicio, index) => (
													<tr key = {servicio.id}>
														<th colSpan = {2}>{servicio.servicio}</th>
														<th>
															<button type = 'button' className = 'btn btn-danger btn-sm'
																onClick = {()=>arrayHelpers.remove(index)}
																disabled = { !this.state.isEdit }
															>
																<FontAwesomeIcon icon = { faTrashAlt } />
															</button>
														</th>
													</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
									}
								</React.Fragment>
							)}
						/>
						{ this.renderMobiliario() }
						{ this.state.isEdit &&
						<div className = 'form-group mt-4'>
							<button className = 'btn btn-primary btn-lg btn-block' disabled = { isSubmitting }>
								{ !isSubmitting && 'Registro de la sala de juntas' }
								{isSubmitting &&
								<div className="spinner-border text-light" role="status" />
								}
							</button>
						</div>
						}
					</form>
					)}
				</Formik>
			)
		}
	}

	render(){
		return(
			<Container
				title = {this.props.salaJuntas.nombre || 'Cargando...'}
				toBack = '/sala-juntas'
				elementHeader = {
					<button className = {`btn btn-primary ${this.state.isEdit ? 'active' : ''}`}
						onClick = { this.toggleEdit }
					>
						<FontAwesomeIcon icon = { faPenAlt } />
					</button>
				}
			>
				<ul className = 'nav nav-tabs'>
					<li className = 'nav-item'>
						<a className = {`nav-link ${this.state.tabIndex == 0 ? 'active' : ''}`} onClick = {( )=> this.goToTab(0) } style = {{ cursor: 'pointer' }} >
							Información
						</a>
					</li>
					<li className = 'nav-item'>
						<a className = {`nav-link ${this.state.tabIndex == 1 ? 'active' : ''}`} onClick = {( )=> this.goToTab(1) } style = {{ cursor: 'pointer' }}>
							Imagenes
						</a>
					</li>
				</ul>
				<section className = 'mt-4 px-4'>
					<div className = 'row justify-content-center'>
						{ this.renderFormUpdate() }
						{ this.renderImageUpdate() }
					</div>
				</section>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	salaJuntas: state.salaJuntasData.salaJuntasSelected,
	edificios: state.edificiosData.edificios,
	oficinasSizes: state.configData.oficinasSizes,
	mobiliario: state.mobiliarioData.mobiliario,
	servicios: state.serviciosData.servicios,
	tipoTiempos: state.configData.catTiemposRenta,
	imagenesStatus: state.salaJuntasData.status.imagesSalaJuntas,
})

const mapDispatchToProps = dispatch => ({
	fetchImagenesSala(id){
		dispatch( salaJuntasActions.startFetchImagesSalaJuntas(id) )
	},
	removeImage(id){
		dispatch(salaJuntasActions.removeImageToSalaJuntasSelected(id))
	},
	fetchSalaJuntas(){
		dispatch(salaJuntasActions.startFetchSalaJuntas())
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(SalaJuntasUpdate)
