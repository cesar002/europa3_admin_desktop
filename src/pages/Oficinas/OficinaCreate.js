import React from 'react';
import { connect } from 'react-redux'
import swal from 'sweetalert2';
import { Formik, FieldArray } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

import { startFetchOficinas } from '../../redux/actions/oficinasActions'
import { startFetchMobiliario } from '../../redux/actions/mobiliarioActions';

import Container from '../../components/pures/ContainerMaster'
import ThumbnailPreview from '../../components/pures/ThumbnailImageLocalPreview'

import Europa3Api from '../../api';

class OficinaCreate extends React.Component{
	constructor(props){
		super(props);

		this.goToTab = this.goToTab.bind(this);
		this.renderOficinaFisica = this.renderOficinaFisica.bind(this);
		this.renderOficinaVirtual = this.renderOficinaVirtual.bind(this);
		this.registerOficina = this.registerOficina.bind(this);
		this.setFiles = this.setFiles.bind(this);
		this.renderImageThumbnails = this.renderImageThumbnails.bind(this);
		this.removeImage = this.removeImage.bind(this);
		this.fetchMobiliario = this.fetchMobiliario.bind(this);
		this.addMobiliario = this.addMobiliario.bind(this);
		this.addServicio = this.addServicio.bind(this);
		this.incMobiliario = this.incMobiliario.bind(this);
		this.decMobiliario = this.decMobiliario.bind(this);

		this.state = {
			edificioIdError: null,
			tabIndex: 0,
			files: null,
			currentMobiliarioId: 0,
			currentServicioId: 0,
			serviciosSelected: [],
			mobiliario: [],
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevState.files && this.state.files){
			if(prevState.files.length !== this.state.files.length){
				if(this.state.files.length == 0){
					this.setState({
						files: null,
					}, ()=>{
						this.inputFiles.value = ''
					})
				}
			}
		}
	}

	async fetchMobiliario(e){
		const id = Number(e.target.value);
		const resp = await Europa3Api.getMobiliarioByEdificio(id);

		this.setState({
			mobiliario: resp.data
		});
	}

	removeImage(index){
		const newImages = this.state.files.filter((f, i) => i !== index);

		this.setState({
			files: newImages
		})
	}

	goToTab(index){
		this.setState({
			tabIndex: index
		})
	}

	setFiles(e){
		const files = Array.from(e.target.files)

		this.setState({
			files: files,
		})
	}

	addMobiliario(mobiliarios = [], arrayHelpers){
		const { currentMobiliarioId } = this.state

		if(mobiliarios.some(m => m.id == currentMobiliarioId || currentMobiliarioId == 0))
			return;

		const mobiliario = this.state.mobiliario.find(m => m.id == currentMobiliarioId)

		if(mobiliario.usado >= mobiliario.cantidad)
			return;

		arrayHelpers.push({ id: mobiliario.id, nombre: mobiliario.nombre, cantidad: 1 , image: mobiliario.image})
	}

	addServicio(servicios = [], arrayHelpers){
		const { currentServicioId } = this.state

		if(servicios.some(s => s.id == currentServicioId) || currentServicioId == 0){
			return;
		}

		const servicio = this.props.servicios.find(s => s.id == currentServicioId);

		arrayHelpers.push({ ...servicio });
	}

	renderImageThumbnails(){
		if(this.state.files){
			if(this.state.files.length > 0){
				return (
					<div className = 'form-row py-4'>
						{ this.state.files.map((file, i) =>(
							<div className = {`col-6 col-sm-3 ${ this.state.files.length >= 3? 'mx-3' : 'mx-5' }`}
								key = {file.name}
							>
								<div className = 'btn btn-danger btn-sm float-right' style = {{ position: 'absolute' }}
									onClick = { () => this.removeImage(i) }
								>
									<FontAwesomeIcon icon = { faTrashAlt } />
								</div>
								<ThumbnailPreview file = { file } />
							</div>
						)) }
					</div>
				)
			}
		}
	}

	registerOficina(values, setSubmit, resetForm){
		if(!this.state.files){
			setSubmit(false);
			return;
		}

		const { files } = this.state
		const data = new FormData();

		Object.keys(values).map(k => {
			if(k == 'servicios'){
				values[k].forEach(s => {
					data.append('servicios[]', s.id)
				})
			}else if(k == 'mobiliario'){
				values[k].forEach(m => {
					data.append('mobiliario[]', JSON.stringify({ id :  m.id, cantidad: m.cantidad}));
				})
			}else{
				data.append(k, values[k]);
			}
		})

		if(files){
			files.forEach(file => {
				data.append('images[]', file)
			})
		}

		Europa3Api.registerOficina(data)
		.then(resp => {
				swal.fire({
					icon: 'success',
					title: 'Correcto',
					text: 'Oficina registrada con éxito',
				})
				this.setState({
					files: null,
					currentServicioId: 0,
				}, () => {
					this.props.fetchOficinas();
					this.props.fetchMobiliario();
					resetForm();
					this.inputFiles.value = ''
				})
			})
			.catch(err => {
				swal.fire({
					icon: 'error',
					title: 'Ocurrió un error',
					text: 'Hubo un problema al registrar la oficina, intentelo nuevamente',
				})
			})
			.finally(()=> setSubmit(false))
	}

	incMobiliario(mobiliario){
		let newCantidad = mobiliario.cantidad + 1;

		const _mobiliario = this.state.mobiliario.find(m => m.id == mobiliario.id);
		let sum = newCantidad + _mobiliario.usado;

		if(sum > _mobiliario.cantidad){
			return mobiliario;
		}

		return {...mobiliario, cantidad: newCantidad}
	}

	decMobiliario(mobiliario){
		let newCantidad = mobiliario.cantidad - 1;
		if(newCantidad <= 0){
			return mobiliario;
		}

		return {...mobiliario, cantidad: newCantidad}
	}

	renderOficinaFisica(){
		return(
			<Formik
				initialValues = {{
					edificio_id: 0,
					size_id: 0,
					nombre: '',
					descripcion: '',
					dimension: '',
					capacidad_recomendada: '',
					capacidad_maxima: '',
					precio: '',
					mobiliario: [],
					servicios: [],
				}}
				validate = {values => {
					const errors = {};

					if(values.edificio_id == 0){
						errors.edificio_id = 'Campo obligatorio';
					}

					if(!values.nombre){
						errors.nombre = 'Campo obligatorio';
					}

					if(values.size_id == 0){
						errors.size_id = 'Campo obligatorio';
					}

					if(!values.descripcion){
						errors.descripcion = 'Campo obligatorio';
					}

					if(!values.dimension){
						errors.dimension = 'Campo obligatorio'
					}

					if(!values.capacidad_recomendada){
						errors.capacidad_recomendada = 'Campo obligatorio'
					}else if(values.capacidad_recomendada == 0){
						errors.capacidad_recomendada = 'La capacidad recomendada debe ser de al menos 1'
					}else if(!/^\d*$/.test(values.capacidad_recomendada)){
						errors.capacidad_recomendada = 'Formato invaido'
					}

					if(!values.capacidad_maxima){
						errors.capacidad_maxima = 'Campo obligatorio'
					}else if(values.capacidad_maxima && values.capacidad_recomendada){
						if(values.capacidad_maxima < values.capacidad_recomendada){
							errors.capacidad_maxima = 'La capacidad debe ser igual o mayor a la capacidad recomendada'
						}
					}
					else if(!/^\d*$/.test(values.capacidad_maxima)){
						errors.capacidad_maxima = 'Formato invalido'
					}

					if(values.precio == 0){
						errors.precio = 'Campo obligatorio'
					}else if(!/^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(values.precio)){
						errors.precio = 'Formato invalido'
					}

					if(values.mobiliario.length == 0){
						error.mobiliario = 'Debe haber al menos un mobiliario agregado'
					}

					if(values.servicios.length == 0){
						error.servicios = 'Debe haber al menos un servicio registrado'
					}

					return errors;
				}}
				onSubmit = { (values, { setSubmitting, resetForm }) => this.registerOficina(values, setSubmitting, resetForm) }
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
							<div className = 'form-group col-12 col-md-6'>
								<label htmlFor = 'edificio'>Edificio:</label>
								<select id = 'edificio' className = {`form-control ${errors.edificio_id ? 'is-invalid' : ''}`}
									value = { values.edificio_id }
									name = 'edificio_id'
									onChange = { e => {
										this.fetchMobiliario(e);
										handleChange(e)
									}}
									style = {{minWidth: '17rem' }}
								>
									<option value = {0}>
										Selecione un edificio
									</option>
									{this.props.edificios.map(edi => (
									<option key = {edi.id} value = {edi.id}>
										{edi.nombre}
									</option>
									))}
								</select>
								{errors.edificio_id &&
								<div className = 'invalid-feedback'>
									{errors.edificio_id}
								</div>
								}
							</div>
							<div className = 'form-group col-12 col-md-6'>
								<label htmlFor = 'size-oficina'>Tamaño de la oficina</label>
								<select id= 'size-oficina'
									className = {`form-control ${errors.size_id && touched.size_id? 'is-invalid' : ''}`}
									value = { values.size_id }
									name = 'size_id'
									onChange = { handleChange }
									onBlur = { handleBlur }
									style = {{minWidth: '17rem' }}
								>
									<option value = {0}>Seleccione el tamaño</option>
									{this.props.oficinasSizes.map(of => (
									<option key = {of.id} value = {of.id}>{of.size_name}</option>
									))}
								</select>
								{errors.size_id &&
								<div className = 'invalid-feedback'>
									{errors.size_id}
								</div>
								}
							</div>
						</div>
						<div className = 'form-group'>
							<label htmlFor = 'nombre'>Nombre de la oficina:</label>
							<input id = 'nombre'
								className = {`form-control ${errors.nombre && touched.nombre ? 'is-invalid' : ''}`}
								type = 'text'
								name = 'nombre'
								onChange = { handleChange }
								onBlur = { handleBlur }
								value = { values.nombre }
							/>
							{errors.nombre &&
							<div className="invalid-feedback">
								{errors.nombre}
							</div>
							}
						</div>
						<div className = 'form-group'>
							<label htmlFor = 'descripcion'>Descripción de la oficina</label>
							<textarea
								id = 'descripcion'
								value = { values.descripcion }
								onChange = { handleChange }
								onBlur = { handleBlur }
								className = {`form-control ${errors.descripcion && touched.descripcion ? 'is-invalid' : ''}`}
								rows = { 5 }
							/>
							{errors.descripcion &&
							<div className = 'invalid-feedback'>
								{errors.descripcion}
							</div>
							}
						</div>
						<div className = 'form-group'>
							<label htmlFor = 'images-input'>Imagenes de la oficina</label>
							<input id = 'images-input' className = 'form-control-file'
								type = 'file'
								name = 'images[]'
								onChange = { this.setFiles }
								multiple
								accept='image/x-png,image/gif,image/jpeg'
								ref = {el => this.inputFiles = el}
							/>
						</div>
						{ this.renderImageThumbnails() }
						<div className = 'form-group'>
							<label htmlFor = 'dimensiones'>Dimensiones de la oficina</label>
							<input id = 'dimensiones'
								name = 'dimension'
								value = { values.dimension }
								onChange = { handleChange }
								onBlur = { handleBlur }
								className = {`form-control ${errors.dimension && touched.dimension? 'is-invalid' : ''}`}
							/>
							{errors.dimension &&
							<div className = 'invalid-feedback'>
								{ errors.dimension }
							</div>
							}
						</div>
						<div className = 'form-row'>
							<div className = 'form-group col-12 col-md-6'>
								<label htmlFor = 'capacidad-recomendada'>Capacidad recomendada</label>
								<input id = 'capacidad-recomendada'
									type = 'number'
									name = 'capacidad_recomendada'
									value = { values.capacidad_recomendada }
									onChange = { handleChange }
									onBlur = { handleBlur }
									className = {`form-control ${errors.capacidad_recomendada && touched.capacidad_recomendada ? 'is-invalid' : ''}`}
								/>
								{errors.capacidad_recomendada &&
								<div className = 'invalid-feedback'>
									{errors.capacidad_recomendada}
								</div>
								}
							</div>
							<div className = 'form-group col-12 col-md-6'>
								<label htmlFor = 'capacidad-maxima'>Capacidad máxima</label>
								<input id = 'capacidad-maxima'
									name = 'capacidad_maxima'
									type = 'number'
									value = { values.capacidad_maxima }
									onChange = { handleChange }
									onBlur = { handleBlur }
									className = {`form-control ${errors.capacidad_maxima && touched.capacidad_maxima ? 'is-invalid' : ''}`}
								/>
								{errors.capacidad_maxima &&
								<div className = 'invalid-feedback'>
									{errors.capacidad_maxima}
								</div>
								}
							</div>
						</div>
						<div className = 'form-group'>
							<label htmlFor = 'precio'>Precio de la oficina</label>
							<div className = 'input-group'>
								<div className = 'input-group-prepend'>
									<div className = 'input-group-text'>$</div>
								</div>
								<input id = 'precio'
									type = 'number'
									name = 'precio'
									value = { values.precio }
									onChange = { handleChange }
									onBlur = { handleBlur }
									className = {`form-control ${errors.precio && touched.precio ? 'is-invalid' : ''}`}
									style = {{ maxWidth: '10rem' }}
								/>
								{errors.precio &&
								<div className = 'invalid-feedback'>
									{ errors.precio }
								</div>
								}
							</div>
						</div>
						<div className = 'pb-3'>
							<FieldArray
								name = 'servicios'
								render = { arrayHelpers => (
									<React.Fragment>
										<div className = 'form-row'>
											<div className = 'form-inline mb-3'>
												<label htmlFor = 'servicio'>Servicios:</label>
												<select id = 'servicio' className = {`form-control mx-3 ${errors.servicios && touched.servicios ? 'is-invalid' : ''}`}
													style = {{ minWidth: '10rem' }}
													value = { this.state.currentServicioId }
													onChange = { e => this.setState({ currentServicioId: Number(e.target.value) }) }
												>
													<option value = {0}>Seleccione el servicio</option>
													{this.props.servicios.map(s => (
													<option key = {s.id} value = {s.id}>{s.servicio}</option>
													))}
												</select>
												{errors.servicios && <span className = 'invalid-feedback'>{errors.servicios}</span>}
												<button type = 'button' className = 'btn btn-primary btn-sm'
													onClick = {() => this.addServicio(values.servicios, arrayHelpers) }
												>
													Agregar
												</button>
											</div>
										</div>
										{ values.servicios.length > 0  &&
										<div className = 'row d-flex justify-content-center'>
											<div className = 'col'>
												<table className = 'table'>
													<thead>
														<tr>
															<th scope = 'col'>Servicio</th>
															<th scope = 'col'></th>
															<th scope = 'col'></th>
														</tr>
													</thead>
													<tbody>
														{values.servicios.map((s, i) => (
														<tr key = {s.id}>
															<th colSpan = '2'>{s.servicio}</th>
															<th className = 'd-flex justify-content-between'>
																<div className = 'btn btn-danger btn-sm'
																	onClick = {() => arrayHelpers.remove(i) }
																>
																	<FontAwesomeIcon icon = { faTrashAlt } />
																</div>
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
							<FieldArray
								name = 'mobiliario'
								render = { arrayHelpers => (
									<React.Fragment>
										<div className = 'form-row'>
											<div className = 'form-inline mb-3'>
												<label htmlFor = 'mobiliario'>Mobiliario:</label>
												<select id = 'mobiliario' className = {`form-control mx-3 ${errors.mobiliario && touched.mobiliario ? 'is-invalid' : ''}`}
													style = {{ minWidth: '10rem' }}
													value = {this.state.currentMobiliarioId}
													onChange = { e => this.setState({ currentMobiliarioId: Number(e.target.value) }) }
												>
													<option value = {0}>Seleccione mobiliario</option>
													{this.state.mobiliario.map(m => (
													<option value = {m.id} key = {m.id}>{m.nombre}</option>
													))}
												</select>
												{errors.mobiliario && <span className = 'invalid-feedback'>{errors.mobiliario}</span>}
												<button type = 'button' className = 'btn btn-primary btn-sm'
													onClick = { () => this.addMobiliario(values.mobiliario, arrayHelpers) }>
													Agregar
												</button>
											</div>
										</div>
										{ values.mobiliario.length > 0  &&
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
														{values.mobiliario.map((mob, i) => (
														<tr key = {mob.id}>
															<th>{mob.nombre}</th>
															<th><img alt = {mob.nombre} src = {mob.image} style = {{ width: '40px', height: '40px' }} /></th>
															<th>
																<span className = 'mx-3'>
																	{mob.cantidad}
																</span>
																<div className = 'btn-group' role = 'group' aria-label='incremento mobiliario'>
																	<button type = 'button' className = 'btn btn-success btn-sm'
																		onClick = {()=>arrayHelpers.replace(i, this.incMobiliario(mob))}
																	>
																		<FontAwesomeIcon icon = { faPlus } />
																	</button>
																	<button type = 'button' className = 'btn btn-danger btn-sm'
																		onClick = {()=>arrayHelpers.replace(i, this.decMobiliario(mob))}
																	>
																		<FontAwesomeIcon icon = { faMinus } />
																	</button>
																</div>
															</th>
															<th className = 'd-flex justify-content-between'>
																<div className = 'btn btn-danger btn-sm'
																	onClick = { () => arrayHelpers.remove(i) }
																>
																	<FontAwesomeIcon icon = { faTrashAlt } />
																</div>
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
						</div>
						<div className = 'form-group'>
							<button className  = 'btn btn-primary btn-lg btn-block' disabled = {isSubmitting}>
								{!isSubmitting &&
								'Registrar oficina'
								}
								{isSubmitting &&
								<div className="spinner-border text-light" role="status" />
								}
							</button>
						</div>
					</form>
				)}
			</Formik>
		)
	}

	renderOficinaVirtual(){
		return <div></div>
	}


   render(){
      return(
            <Container
					title = 'Registrar oficina'
					toBack = '/oficinas'
            >
					<ul className = 'nav nav-tabs pt-4'>
						<li className = 'nav-item'>
							<a className = {`nav-link ${this.state.tabIndex == 0 ? 'active' : ''}`} onClick = {( )=> this.goToTab(0) } style = {{ cursor: 'pointer' }} >
								Oficina fisica
							</a>
						</li>
						<li className = 'nav-item'>
							<a className = {`nav-link ${this.state.tabIndex == 1 ? 'active' : ''}`} onClick = {( )=> this.goToTab(1) } style = {{ cursor: 'pointer' }}>
								Oficina virtual
							</a>
						</li>
					</ul>
					<section className = 'mt-4 d-flex justify-content-center'>
						<div className = 'row mt-3'>
						{this.state.tabIndex == 0 &&
						this.renderOficinaFisica()
						}
						{this.state.tabIndex == 1 &&
						this.renderOficinaVirtual()
						}
						</div>
					</section>
            </Container>
      )
   }
}


const mapStateToProps = state => ({
	edificios: state.edificiosData.edificios,
	oficinasSizes: state.configData.oficinasSizes,
	mobiliario: state.mobiliarioData.mobiliarioCreate.mobiliario,
	servicios: state.serviciosData.servicios,
})

const mapDispatchToProps = dispatch => ({
	fetchOficinas(){
		dispatch(startFetchOficinas());
	},
	fetchMobiliario(){
		dispatch(startFetchMobiliario());
	},
})


export default connect(mapStateToProps, mapDispatchToProps)(OficinaCreate)

