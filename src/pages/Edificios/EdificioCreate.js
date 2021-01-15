import React from 'react';
import { Formik, FieldArray } from 'formik';
import * as Yup from "yup";
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { startFetchMunicipios } from '../../redux/actions/locationActions'
import { startFetchRegisterEdificio, startFetchEdificios } from '../../redux/actions/edificioAction'

import Europa3Api from '../../api';

import Container from '../../components/pures/ContainerMaster'

class EdificioCreate extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			currentIdiomaId: 0,
			currentEstadoId: 0,
			showSwal: false,
			timeError: null,
		}

		this.fetchMunicipios = this.fetchMunicipios.bind(this);
		this.registerEdificio = this.registerEdificio.bind(this);
		this.addIdioma = this.addIdioma.bind(this);
	}

	fetchMunicipios(id){
		this.setState({
			currentEstadoId: id
		}, ()=> this.props.fetchMunicipios(id))
	}

	registerEdificio(data, resetForm, setSubmit){
		if(!moment(data.hora_cierre, 'HH:mm').isAfter(moment(data.hora_apertura, 'HH:mm'))){
			this.setState({
				timeError: 'La hora de cierre debe ser mayor a la hora de apertura',
			})

			setSubmit(false)
			return;
		}

		this.setState({
			timeError: null
		});
		Europa3Api.registerEdificio(data).then(res => {
			this.setState({
				currentEstadoId: 0
			}, ()=>{
				this.props.fetchEdificios();
				swal.fire({
					icon: 'success',
					title: 'Correcto',
					text: 'Edificio registrado con éxito',
				})
				resetForm();
			})
		})
		.catch(err => {
			swal.fire({
				icon: 'error',
				title: 'Ocurrió un error',
				text: 'Hubo un problema al registrar el edificio, intentelo nuevamente',
			})
		})
		.finally(() => setSubmit(false) )
	}

	addIdioma(idiomas = [], arrayHelpers){

		const { currentIdiomaId } = this.state

		if(idiomas.some(idi => idi.id == currentIdiomaId) || currentIdiomaId == 0){
			return;
		}

		const idioma = this.props.idiomasAtencion.find(m => m.id == currentIdiomaId)

		arrayHelpers.push({ ...idioma })
	}



	render(){
		return(
			<Container title = 'Registrar edificio' toBack = '/edificios'>
				<section className = 'px-3 d-flex justify-content-center'>
					<div className = 'row pt-3'>
						<Formik
							initialValues = {{
								nombre:  '',
								direccion: '',
								municipio_id: 0,
								telefono: '',
								telefono_2: '',
								telefono_recepcion: '',
								hora_apertura: '',
								hora_cierre: '',
								idiomas_atencion: [],
							}}
							validationSchema = {Yup.object().shape({
								nombre: Yup.string().required('Nombre del edificio requerido'),
								direccion: Yup.string().required('Dirección del edificio requerido'),
								municipio_id: Yup.number().required('Municipio requerido').min(1, 'Seleccione un municipio'),
								telefono: Yup.number().typeError('Formato incorrecto').required('Número de teléfono requerido').positive('Número de telefono incorrecto').integer('Número de telefono incorrecto'),
								telefono_recepcion: Yup.number().typeError('Formato incorrecto').required('Número de teléfono requerido').positive('Número de telefono incorrecto').integer('Número de telefono incorrecto'),
								hora_apertura: Yup.string().required('Hora de apertura requerido'),
								hora_cierre: Yup.string().required('Hora de cierre requerido'),
								idiomas_atencion: Yup.array().required('Debe agregar un idioma')
							})}
							onSubmit={(values, { setSubmitting, resetForm }) => {
								this.registerEdificio(values, resetForm, setSubmitting)
						}}
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
								<div className = 'form-group'>
									<label htmlFor = 'nombre'>Nombre del edificio*</label>
									<input id = 'nombre'
										className = {`form-control ${errors.nombre && touched.nombre ? 'is-invalid' : ''}`}
										type = 'text'
										name = 'nombre'
										onChange={ handleChange }
										onBlur={ handleBlur }
										value = { values.nombre }
									/>
									{errors.nombre &&
									<div className="invalid-feedback">
										{errors.nombre}
									</div>
									}
								</div>
								<div className = 'form-row'>
									<div className = 'form-group col-10 col-md-6'>
										<label htmlFor = 'estado'>Estado*</label>
										<select id = 'estado' value = {this.state.currentEstadoId}
											className = 'form-control' name = 'estado_id'
											onChange = { event => this.fetchMunicipios(event.target.value) }
										>
											<option value = {0} >Seleccione un estado</option>
											{this.props.estados.map(estado => (
											<option key = {estado.abrev} value = {estado.id}>
												{estado.nombre}
											</option>
											))}
										</select>
									</div>
									<div className = 'form-group col-10 col-md-6'>
										<label htmlFor='municipio'>Municipio*</label>
										<select id = 'municipio'
											value = {values.municipio_id}
											name = 'municipio_id'
											className = 'form-control' disabled = { this.state.currentEstadoId == 0 && (this.props.municipios.length == 0 || !this.props.municipiosStatus.finish) }
											onChange={ handleChange }
											onBlur={ handleBlur }
										>
											<option value = {0}>Selecione un municipio</option>
											{this.props.municipios.length > 0 &&
											this.props.municipios.map(municipio => (
											<option key = {municipio.clave} value = {municipio.id}>
												{municipio.nombre}
											</option>
											))
											}
										</select>
										{errors.municipio_id &&
										<div className="invalid-feedback">
											{errors.municipio_id}
										</div>
										}
									</div>
								</div>
								<div className = 'form-group'>
									<label htmlFor = 'direccion'>Dirección*</label>
									<input id = 'direccion'
										className = {`form-control ${errors.direccion && touched.direccion ? 'is-invalid':''}`}
										type = 'text'
										name = 'direccion'
										onChange={ handleChange }
										onBlur={ handleBlur }
										value = {values.direccion}
									/>
									{errors.direccion &&
									<div className="invalid-feedback">
										{errors.direccion}
									</div>
									}
								</div>
								<div className = 'form-row'>
									<div className = 'form-group col-10 col-md-4'>
										<label htmlFor = 'telefono'>Teléfono*</label>
										<input id = 'telefono'
											className = {`form-control ${errors.telefono && touched.telefono ? 'is-invalid':''}`}
											type = 'text'
											name = 'telefono'
											onChange = { handleChange }
											onBlur = { handleBlur }
											value = {values.telefono}
										/>
										{errors.telefono &&
										<div className="invalid-feedback">
											{errors.telefono}
										</div>
										}
									</div>
									<div className = 'form-group col-10 col-md-4'>
										<label htmlFor = 'telefono_2'>Teléfono 2</label>
										<input id = 'telefono_2'
											className = 'form-control'
											type = 'text'
											name = 'telefono_2'
											value = {values.telefono_2}
											onChange = { handleChange }
											onBlur = { handleBlur }
											placeholder = 'Opcional'
										/>
									</div>
									<div className = 'form-group col-10 col-md-4'>
										<label htmlFor = 'telefono_recepcion'>Teléfono de recepción</label>
										<input id = 'telefono_recepcion'
											className = {`form-control ${errors.telefono_recepcion && touched.telefono_recepcion ? 'is-invalid':''}`}
											type = 'text'
											name = 'telefono_recepcion'
											value = {values.telefono_recepcion}
											onChange = { handleChange }
											onBlur = { handleBlur }
										/>
										{errors.telefono_recepcion &&
										<div className="invalid-feedback">
											{errors.telefono_recepcion}
										</div>
										}
									</div>
								</div>
								<div className = 'form-group'>
									<label htmlFor = 'hora_apertura'>Hora de apertura*</label>
									<input id='hora_apertura'
										className = {`form-control ${errors.hora_apertura && touched.hora_apertura ? 'is-invalid' : ''}`}
										type = 'time'
										name = 'hora_apertura'
										value = {values.hora_apertura}
										onChange = { handleChange }
										onBlur = { handleBlur }
										style = {{maxWidth: '10rem'}}
									/>
									{errors.hora_apertura &&
									<div className="invalid-feedback">
										{errors.hora_apertura}
									</div>
									}
								</div>
								<div className = 'form-group'>
									<label htmlFor = 'hora_cierre'>Hora de cierre*</label>
									<input id = 'hora_cierre'
										className = {`form-control ${errors.hora_cierre && touched.hora_cierre ? 'is-invalid' : ''}`}
										type = 'time'
										name = 'hora_cierre'
										value = {values.hora_cierre}
										onChange = { handleChange }
										onBlur = { handleBlur }
										style = {{maxWidth: '10rem'}}
									/>
									{errors.hora_cierre &&
									<div className="invalid-feedback">
										{errors.hora_cierre}
									</div>
									}
									{this.state.timeError  &&
									<div className="invalid-feedback">
										{this.state.timeError }
									</div>
									}
								</div>
								<FieldArray
									name = 'idiomas_atencion'
									render = { arrayHelpers => (
									<React.Fragment>
										<div className = 'form-row'>
											<div className = 'form-inline mb-3'>
												<label htmlFor = 'idiomas'>Idiomas de atención:</label>
													<select id = 'idiomas' className = {`form-control mx-3 ${errors.idiomas_atencion && touched.idiomas_atencion ? 'is-invalid' : ''}`}
														style = {{ minWidth: '10rem' }}
														value = { this.state.currentIdiomaId }
														onChange = { e => this.setState({ currentIdiomaId: Number(e.target.value) }) }
													>
														<option value = {0}>Seleccione el idioma</option>
														{this.props.idiomasAtencion.map(d => (
														<option key = {d.id} value = {d.id}>{d.idioma}</option>
														))}
													</select>
													{errors.idiomas_atencion && <span className = 'invalid-feedback'>{errors.idiomas_atencion}</span>}
													<button type = 'button' className = 'btn btn-primary btn-sm'
														onClick = {() => this.addIdioma(values.idiomas_atencion, arrayHelpers) }
													>
														Agregar
													</button>
											</div>
										</div>
										{ values.idiomas_atencion.length > 0 &&
										<div className = 'row d-flex justify-content-center'>
											<div className = 'col'>
												<table className = 'table'>
													<thead>
														<tr>
															<th scope = 'col'>Idioma</th>
															<th scope = 'col'></th>
														</tr>
													</thead>
													<tbody>
														{ values.idiomas_atencion.map((d, i) =>
														<tr key = { d.id }>
															<th>{d.idioma}</th>
															<th>
																<button className = "btn btn-danger btn-sm"
																	onClick = {() => arrayHelpers.remove(i)}
																>
																	<FontAwesomeIcon icon = { faTrash } />
																</button>
															</th>
														</tr>
														) }
													</tbody>
												</table>
											</div>
										</div>

										}
									</React.Fragment>
									)}
								/>
								<div className = 'form-group'>
									<button className = 'btn btn-primary btn-lg btn-block'
										type="submit" disabled={ isSubmitting }
									>
										{!isSubmitting &&
										<span>Registrar edificio</span>
										}
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
		)
	}
}

const mapStateToProps = state => ({
	estados: state.locationsData.estados,
	municipios: state.locationsData.municipios,
	municipiosStatus: state.locationsData.status.statusMunicipios,
	registerStatus: state.edificiosData.status.statusRegister,
	idiomasAtencion: state.idiomasAtencionData.idiomasAtencion,
})

const mapDispatchToProps = dispatch => ({
	fetchMunicipios(estado_id){
		dispatch(startFetchMunicipios(estado_id));
	},
	fetchEdificios(){
		dispatch(startFetchEdificios());
	},
	fetchRegisterEdificio(data){
		dispatch(startFetchRegisterEdificio(data));
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(EdificioCreate);
