import React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert2';

import Europa3Api from '../../api';

import { startFetchMunicipios } from '../../redux/actions/locationActions'
import { startFetchEdificios } from '../../redux/actions/edificioAction'

import Container from '../../components/pures/ContainerMaster'


class EdificioUpdate extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			currentEstadoId: 0,
			isEdit: false,
		}

		this.toggleEdit = this.toggleEdit.bind(this);
		this.fetchMunicipios = this.fetchMunicipios.bind(this);
	}

	componentDidMount(){
		this.setState({
			currentEstadoId: this.props.edificio.municipio.estado.id
		}, ()=>{
			this.props.fetchMunicipios(this.props.edificio.municipio.estado.id)
		})
	}

	toggleEdit(){
		const edit = !this.state.isEdit;
		this.setState({
			isEdit: edit
		})
	}

	fetchMunicipios(id){
		this.props.fetchMunicipios(id)
	}

	updateEdificio(value, setSubmitting, resetForm){
		Europa3Api.updateEdificio(value, this.props.edificio.id)
			.then(resp => {
				this.setState({
					isEdit: false
				})
				this.props.fetchEdificios()
				swal.fire({
					icon: 'success',
					title: 'Correcto',
					text: 'Datos actualizados con éxito'
				})
			})
			.catch(err => {
				resetForm();
				swal.fire({
					icon: 'error',
					title: 'Ocurrió un error',
					text: 'Hubo un problema al actualizar los datos, intentelo nuevamente',
				})
			})
			.finally(() => setSubmitting(false))
	}


	render(){
		return(
			<Container
				title = {!this.props.edificio.nombre ?
								'Cargando...'
								: `Edificio ${this.props.edificio.nombre}`}
				toBack = '/edificios'
				elementHeader = {
					<div className = {`btn btn-primary ${ this.state.isEdit ? 'active' : '' }`}
						onClick = { this.toggleEdit }
					>
						<FontAwesomeIcon icon = { faPencilAlt } />
					</div>
				}
			>
				<section className = 'px-3 d-flex justify-content-center'>
					<div className = 'row pt-3'>
						{ this.props.edificio.nombre &&
							<Formik
								initialValues = {{
									nombre:  this.props.edificio.nombre,
									direccion: this.props.edificio.direccion,
									municipio_id: this.props.edificio.municipio.municipio.id,
									telefono: this.props.edificio.telefono_1,
									telefono_2: this.props.edificio.telefono_2 == null ? '' : this.props.edificio.telefono_2,
									telefono_recepcion: this.props.edificio.telefono_recepcion,
									hora_apertura: this.props.edificio.horas_servicio.apertura,
									hora_cierre: this.props.edificio.horas_servicio.cierre,
								}}
								validationSchema = {Yup.object().shape({
									nombre: Yup.string().required('Nombre del edificio requerido'),
									direccion: Yup.string().required('Dirección del edificio requerido'),
									municipio_id: Yup.number().required('Municipio requerido').min(1, 'Seleccione un municipio'),
									telefono: Yup.number().typeError('Formato incorrecto').required('Número de teléfono requerido').positive('Número de telefono incorrecto').integer('Número de telefono incorrecto'),
									telefono_recepcion: Yup.number().typeError('Formato incorrecto').required('Número de teléfono requerido').positive('Número de telefono incorrecto').integer('Número de telefono incorrecto'),
									hora_apertura: Yup.string().required('Hora de apertura requerido').matches('^([01]?[0-9]|2[0-3]):[0-5][0-9]$', 'Formato de hora incorrecta'),
									hora_cierre: Yup.string().required('Hora de cierre requerido').matches('^([01]?[0-9]|2[0-3]):[0-5][0-9]$', 'Formato de hora incorrecta'),
								})}
								onSubmit={(values, { setSubmitting, resetForm }) => {
									this.updateEdificio(values, resetForm, setSubmitting)
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
											disabled = { !this.state.isEdit }
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
												disabled = { !this.state.isEdit }
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
											<select id = 'municipio' value = {values.municipio_id} name = 'municipio_id'
												className = 'form-control' disabled = { ((this.state.currentEstadoId == 0 && (this.props.municipios.length == 0 || !this.props.municipiosStatus.finish)) || !this.state.isEdit) }
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
											disabled = { !this.state.isEdit }
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
												disabled = { !this.state.isEdit }
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
												disabled = { !this.state.isEdit }
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
												disabled = { !this.state.isEdit }
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
											type = 'text'
											name = 'hora_apertura'
											value = {values.hora_apertura}
											onChange = { handleChange }
											onBlur = { handleBlur }
											style = {{maxWidth: '10rem'}}
											disabled = { !this.state.isEdit }
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
											type = 'text'
											name = 'hora_cierre'
											value = {values.hora_cierre}
											onChange = { handleChange }
											onBlur = { handleBlur }
											style = {{maxWidth: '10rem'}}
											disabled = { !this.state.isEdit }
										/>
										{errors.hora_cierre &&
										<div className="invalid-feedback">
											{errors.hora_cierre}
										</div>
										}
									</div>
									<div className = 'form-group'>
										<button className = 'btn btn-primary btn-lg btn-block'
											type="submit" disabled={ isSubmitting || !this.state.isEdit }
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
						}
					</div>
				</section>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	edificio: state.edificiosData.selectedEdificio,
	estados: state.locationsData.estados,
	municipios: state.locationsData.municipios,
	municipiosStatus: state.locationsData.status.statusMunicipios,
})

const mapDispatchToProps = dispatch => ({
	fetchMunicipios(estado_id){
		dispatch(startFetchMunicipios(estado_id));
	},
	fetchEdificios(){
		dispatch(startFetchEdificios())
	}
})

export default connect( mapStateToProps, mapDispatchToProps )(EdificioUpdate)
