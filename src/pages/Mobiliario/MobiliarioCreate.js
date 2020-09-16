import React from 'react';
import { connect } from 'react-redux'
import { Formik } from 'formik';
import * as Yup from "yup";

import Container from '../../components/pures/ContainerMaster'

class MobiliarioCreate extends React.Component{

	render(){
		return(
			<Container title = 'Registrar mobiliario' toBack = '/mobiliario'>
				<section className = 'mt-4 px-4 d-flex justify-content-center'>
					<div className = 'row mt-3'>
						<Formik
							initialValues = {{
								tipo_id: 0,
								edificio_id: 0,
								marca: '',
								modelo: '',
								color: '',
								descripcion_bien: '',
								observaciones: '',
								cantidad: 0,
								image: '',
							}}
							validationSchema = {Yup.object().shape({
								tipo_id: Yup.number().required('Campo requerido').min(1, 'Seleccione un tipo de mobiliario'),
								edificio_id: Yup.number().required('Campo requerido').min(1, 'Seleccione un edificio'),
								cantidad: Yup.number().required('Campo requerido').min(1, 'La cantidad minima debe ser 1').integer('Formato incorrecto'),
								image: Yup.mixed().test('image', 'Campo requerido', value => {
									return value ? true : false
								})
							})}
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
										<select id = 'edificio' className = {`form-control ${errors.edificio_id && touched.edificio_id ? 'is-invalid' : ''}`}
											name = 'edificio_id'
											value = { values.edificio_id }
											onChange = { handleChange }
											onBlur = { handleBlur }
										>
											<option value = {0}>Seleccione un edificio</option>
											{this.props.edificios.map(edi =>(
											<option key = {edi.id} value = {edi.id}>{edi.nombre}</option>
											))}
										</select>
										{errors.edificio_id &&
										<div className = 'invalid-feedback'>
											{errors.edificio_id}
										</div>
										}
									</div>
									<div className = 'form-group col-12 col-sm-6'>
										<label htmlFor = 'tipo'>Tipo de mueble</label>
										<select id = 'tipo' className = {`form-control ${errors.tipo_id && touched.tipo_id ? 'is-invalid' : ''}`}
											name = 'tipo_id'
											value = { values.tipo_id }
											onChange = { handleChange }
											onBlur = { handleBlur }
										>
											<option value = {0}>Seleccione un tipo de mueble</option>
											{this.props.tipoMobiliario.map(mon => (
											<option key = {mon.id} value = {mon.id}>{mon.tipo}</option>
											))}
										</select>
										{errors.tipo_id &&
										<div className = 'invalid-feedback'>{errors.tipo_id}</div>
										}
									</div>
								</div>
								<div className = 'form-row'>
									<div className = 'form-group col-12 col-sm-4'>
										<label htmlFor = 'marca'>Marca</label>
										<input className = 'form-control'
											id = 'marca'
											name = 'marca'
											value = { values.marca }
											onChange = { handleChange }
											onBlur = { handleBlur }
										/>
									</div>
									<div className = 'form-group col-12 col-sm-4'>
										<label htmlFor = 'modelo'>Modelo</label>
										<input className = 'form-control'
											id = 'modelo'
											name = 'modelo'
											value = { values.modelo }
											onChange = { handleChange }
											onBlur = { handleBlur }
										/>
									</div>
									<div className = 'form-group col-12 col-sm-4'>
										<label htmlFor = 'color'>Color</label>
										<input className = 'form-control'
											id = 'color'
											name = 'color'
											value = { values.color }
											onChange = { handleChange }
											onBlur = { handleBlur }
										/>
									</div>
								</div>
								<div className = 'form-group'>
									<label htmlFor = 'descripcion'>Descripción</label>
									<textarea className = 'form-control'
										id = 'descripcion'
										name = 'descripcion_bien'
										value = { values.descripcion_bien }
										onChange = { handleChange }
										onBlur = { handleBlur }
										rows = { 5 }
									/>
								</div>
								<div className = 'form-group'>
									<label htmlFor = 'observaciones'>Observaciones</label>
									<textarea className = {`form-control`}
										id = 'observaciones'
										name = 'observaciones'
										value = { values.observaciones }
										onChange = { handleChange }
										onBlur = { handleBlur }
										rows = { 5 }
									/>
								</div>
								<div className = 'form-group'>
									<label htmlFor = 'cantidad'>Cantidad</label>
									<input className = {`form-control ${errors.cantidad && touched.cantidad ? 'is-invalid' : ''}`}
										id = 'cantidad'
										name = 'cantidad'
										value = { values.cantidad }
										onChange = { handleChange }
										onBlur = { handleBlur }
										type = 'number'
									/>
									{errors.cantidad && <div className = 'invalid-feedback'>{errors.cantidad}</div>}
								</div>
								<div className = 'form-group'>
									<label htmlFor = 'image'>Imagen</label>
									<input className = {`form-control-file ${errors.image && touched.image ? 'is-invalid' : ''}`}
										id = 'image'
										name = 'image'
										accept='image/x-png,image/gif,image/jpeg'
										type = 'file'
										value = { values.image }
										onChange = { handleChange }
										onBlur = { handleBlur }
									/>
									{errors.image && <div className = 'invalid-feedback'>{errors.image}</div>}
								</div>
								<div className = 'form-group'>
									<button className = 'btn btn-primary btn-lg btn-block'
										type = 'submit' disabled = { isSubmitting }
									>
										Registrar mobiliario
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
	edificios: state.edificiosData.edificios,
	tipoMobiliario: state.mobiliarioData.tipoMobiliario,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MobiliarioCreate)
