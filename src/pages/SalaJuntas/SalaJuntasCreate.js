import React from 'react';
import { Formik, FieldArray } from 'formik';
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import Container from '../../components/pures/ContainerMaster';


class SalaJuntaCreate extends React.Component{
	constructor(props){
		super(props);

		this.validateForm = this.validateForm.bind(this);
		this.fetchMobiliario = this.fetchMobiliario.bind(this);
		this.addServicio = this.addServicio.bind(this);
		this.renderMobiliario = this.renderMobiliario.bind(this);
		this.addMobiliario = this.addMobiliario.bind(this);

		this.state = {
			mobiliario: [],
			mobiliarioSala: [],
			currentServicioId: 0,
			currentMobiliarioId: 0,
			mobiliarioOficinaError: null,
		}
	}

	validateForm(values){
		const errors = {}

		return errors;
	}

	fetchMobiliario(e){
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
								mobiliario: [],
								servicios: [],
							}}
							validate = { values => this.validateForm(values) }
							onSubmit = { (values, { setSubmitting, resetForm }) => {} }
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
												this.fetchMobiliario(e);
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
									<label htmlFor = 'dimensiones'>Dimensiones</label>
									<input id = 'dimensiones'
										className = {`form-control ${errors.size_dimension && touched.size_dimension ? 'is-invalid' : ''}`}
										value = { values.size_dimension }
										name = 'size_dimension'
										onChange = { handleChange }
										onBlur = { handleBlur }
										style = {{ maxWidth: '8rem' }}
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
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SalaJuntaCreate);
