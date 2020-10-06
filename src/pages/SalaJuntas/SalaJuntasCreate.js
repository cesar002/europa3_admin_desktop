import React from 'react';
import swal from 'sweetalert2';
import { Formik, FieldArray } from 'formik';
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import Container from '../../components/pures/ContainerMaster';
import Thumbnail from '../../components/pures/ThumbnailImageLocalPreview';

import Europa3Api from '../../api';

import * as salaJuntasActions from '../../redux/actions/salaJuntasActions'

class SalaJuntaCreate extends React.Component{
	constructor(props){
		super(props);

		this.validateForm = this.validateForm.bind(this);
		this.filterMobiliarioByEdificio = this.filterMobiliarioByEdificio.bind(this);
		this.addServicio = this.addServicio.bind(this);
		this.renderMobiliario = this.renderMobiliario.bind(this);
		this.addMobiliario = this.addMobiliario.bind(this);
		this.addSalaJuntasImages = this.addSalaJuntasImages.bind(this);
		this.removeSalaJuntasImage = this.removeSalaJuntasImage.bind(this);
		this.registerSalaJuntas = this.registerSalaJuntas.bind(this);

		this.state = {
			mobiliario: [],
			mobiliarioSala: [],
			currentServicioId: 0,
			currentMobiliarioId: 0,
			mobiliarioOficinaError: null,
			images: [],
			imagesError: null,
		}
	}

	filterMobiliarioByEdificio(e){
		const id = Number(e.target.value);
		this.setState({
			mobiliario: this.props.mobiliario.filter(m => m.edificio.id == id),
			mobiliarioSala: [],
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

	updateCantidadMobiliario(id, cantidad){
		this.setState({
			mobiliarioSala: this.state.mobiliarioSala.map(m => m.id == id ? {...m, cantidad} : m)
		})
	}

	addSalaJuntasImages(e){
		const files = Array.from(e.target.files);

		this.setState({
			images : files,
			imagesError: null,
		})
	}

	removeSalaJuntasImage(index){
		this.setState({
			images: this.state.images.filter((img, i) => i !== index)
		}, () => {
			if(this.state.images.length == 0){
				this.inputImages.value = '';
			}
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
						>
							<option value = {0}>Seleccione mobiliario</option>
							{this.state.mobiliario.map(m => (
							<option value = {m.id} key = {m.id}>{m.nombre}</option>
							))}
						</select>
						{this.props.mobiliarioOficinaError && <span className = 'invalid-feedback'>{this.props.mobiliarioOficinaError}</span>}
						<button type = 'button' className = 'btn btn-primary btn-sm' onClick = { this.addMobiliario }>
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
											/>
										</th>
										<th>
											<button className = 'btn btn-danger btn-sm' type = 'button'>
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

	registerSalaJuntas(values, setSubmitting, resetForm){
		if(this.state.images.length == 0){
			this.setState({
				imagesError: 'Debe haber almenos una imagen',
			}, () => setSubmitting(false))

			return;
		}

		if(this.state.mobiliarioSala.length == 0){
			this.setState({
				mobiliarioOficinaError: 'Debe haber almenos un mobiliario agregado'
			}, () => setSubmitting(false))

			return;
		}

		const data = new FormData();
		Object.keys(values).forEach(k => {
			if(k == 'servicios'){
				values[k].forEach(s => {
					data.append('servicios[]', s.id)
				})
			}else{
				data.append(k, values[k]);
			}
		})

		this.state.mobiliarioSala.forEach(m => {
			for (let i = 0; i < m.cantidad; i++) {
				data.append('mobiliario[]', m.id)
			}
		})

		this.state.images.forEach(img => {
			data.append('images[]', img)
		})

		Europa3Api.registerSalaJuntas(data)
		.then(resp => {
			swal.fire({
				icon: 'success',
				title: 'Correcto',
				text: 'Sala de juntas registrada con éxito'
			});
			this.setState({
				mobiliario: [],
				mobiliarioSala: [],
				currentServicioId: 0,
				currentMobiliarioId: 0,
				mobiliarioOficinaError: null,
				images: [],
				imagesError: null,
			}, () => {
				this.props.fetchSalaJuntas();
				resetForm();
			})
		})
		.catch(err => {
			console.error(err)
			swal.fire({
				icon: 'error',
				title: 'Ocurrió un error',
				text: 'Hubo un error al intentar registrar la sala de juntas',
			})
		})
		.finally(() => setSubmitting(false))
	}

	render(){
		return(
			<Container
				title = 'Registrar sala de juntas'
				toBack = '/sala-juntas'
			>
				<section className = 'mt-3 px-4'>
					<div className = 'row d-flex justify-content-center'>
						<Formik
							initialValues = {{
								edificio_id: 0,
								size_id: 0,
								tipo_tiempo_id: 0,
								nombre: '',
								descripcion: '',
								size_dimension: '',
								capacidad_recomendada: '',
								capacidad_maxima: '',
								precio: '',
								servicios: [],
							}}
							validate = { values => this.validateForm(values) }
							onSubmit = { (values, { setSubmitting, resetForm }) => this.registerSalaJuntas(values, setSubmitting, resetForm) }
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
							<form onSubmit = {handleSubmit}>
								<div className = 'form-row'>
									<div className = 'form-group col-12 col-sm-6'>
										<label htmlFor = 'edificio'>Edificio</label>
										<select
											className = {`form-control ${errors.edificio_id && touched.edificio_id ? 'is-invalid' : ''}`}
											id = 'edificio'
											name = 'edificio_id'
											value = {values.edificio_id}
											style = {{minWidth: '10rem' }}
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
										name = 'descripcion'
										onChange = { handleChange }
										onBlur = { handleBlur }
									/>
									{errors.descripcion && <div className = 'invalid-feedback'>{errors.descripcion}</div>}
								</div>
								<div className = 'form-group'>
									<label htmlFor = 'sala-images'>Imagenes de la sala de juntas</label>
									<input id = 'sala-images'
										className = 'form-control-file'
										type = 'file'
										multiple
										accept='image/x-png,image/gif,image/jpeg'
										onChange = { e => this.addSalaJuntasImages(e) }
										ref = { el => this.inputImages = el }
									/>
									{ this.state.imagesError && <div className = 'text-danger'>{this.state.imagesError}</div> }
								</div>
								{ this.state.images.length > 0 &&
									<div className = 'row'>
										{ this.state.images.map((img, i) => (
										<div key = { img.name } className = {`col-6 col-sm-3 ${ this.state.images.length >= 3? 'mx-3' : 'mx-5' }`}>
											<button type = 'button' className = 'btn btn-danger btn-sm float-right'
												style = {{ position : 'absolute' }}
												onClick = { () => this.removeSalaJuntasImage(i) }
											>
												<FontAwesomeIcon icon = { faTrashAlt } />
											</button>
											<Thumbnail file = { img } />
										</div>
										)) }
									</div>
								}
								<div className = 'form-group'>
									<label htmlFor = 'dimensiones'>Dimensiones</label>
									<input id = 'dimensiones'
										className = {`form-control ${errors.size_dimension && touched.size_dimension ? 'is-invalid' : ''}`}
										value = { values.size_dimension }
										name = 'size_dimension'
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
								<div className = 'form-group'>
									<button className = 'btn btn-primary btn-lg btn-block' disabled = { isSubmitting }>
										{ !isSubmitting && 'Registro de la sala de juntas' }
										{isSubmitting &&
										<div className="spinner-border text-light" role="status" />
										}
									</button>
								</div>
							</form>
							)}
						</Formik>
					</div>
				</section>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	edificios: state.edificiosData.edificios,
	oficinasSizes: state.configData.oficinasSizes,
	mobiliario: state.mobiliarioData.mobiliario,
	servicios: state.serviciosData.servicios,
	tipoTiempos: state.configData.catTiemposRenta,
})

const mapDispatchToProps = dispatch => ({
	fetchSalaJuntas(){
		dispatch(salaJuntasActions.startFetchSalaJuntas())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(SalaJuntaCreate);
