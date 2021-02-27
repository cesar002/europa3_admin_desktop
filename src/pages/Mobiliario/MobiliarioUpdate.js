import React, { Component } from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert2';
import { Formik } from 'formik';

import Europa3Api from '../../api';

import { startFetchMobiliario } from '../../redux/actions/mobiliarioActions'

import Container from '../../components/pures/ContainerMaster'
import Loading from '../../components/pures/LoadingScreen';
import { object } from 'yup';

class MobiliarioUpdate extends Component {

	constructor(props){
		super(props);

		this.fetchMobiliario = this.fetchMobiliario.bind(this);

		this.state = {
			currentMobiliario: null,
			isFetchingData: false,
		}
	}

	componentDidMount(){
		this.fetchMobiliario();
	}

	async fetchMobiliario(){
		this.setState({
			isFetchingData: true,
		})

		const id = this.props.match.params.id;
		const resp = await Europa3Api.getMobiliarioById(id);

		if(resp.status !== 'success'){
			return;
		}

		this.setState({
			currentMobiliario: resp.data,
			isFetchingData: false,
		},()=>{
			console.log(this.state.currentMobiliario)
		})
	}

	async updateMobiliario(values, setSubmitting){
		try {
			let data = new FormData();

			Object.keys(values).map(k => {
				data.append(k, values[k]);
			})

			const resp = await Europa3Api.updateMobiliario(values.id, data)

			if (resp.status !== 'success'){
				throw resp.data
			}

			this.fetchMobiliario();
			this.props.fetchMobiliarios();

			swal.fire('Correcto', 'Información actualizada con éxito', 'success')
		} catch (error) {
			swal.fire('Error', 'Ocurrió un error al actualizar la información', 'error')
		}finally{
			setSubmitting(false);
		}
	}

	render() {
		return (
			<Container title = 'Registro de mobiliario' toBack = '/mobiliario'>
				<section className = 'mt-4 px-4 d-flex justify-content-center'>
					<div className = 'row mt-3'>
						{ this.state.currentMobiliario && !this.state.isFetchingData &&
						<Formik
							initialValues = {{
								id: this.state.currentMobiliario.id,
								tipo_id: this.state.currentMobiliario.tipo.id,
								edificio_id: this.state.currentMobiliario.edificio.id,
								nombre: this.state.currentMobiliario.nombre,
								marca: this.state.currentMobiliario.marca ? this.state.currentMobiliario.marca : '',
								modelo: this.state.currentMobiliario.modelo ? this.state.currentMobiliario.modelo : '',
								color: this.state.currentMobiliario.color ? this.state.currentMobiliario.color : '',
								descripcion_bien: this.state.currentMobiliario.descripcion ? this.state.currentMobiliario.descripcion : '',
								observaciones: this.state.currentMobiliario.observaciones ? this.state.currentMobiliario.observaciones : '',
								cantidad: this.state.currentMobiliario.cantidad,
								image: '',
								activo: this.state.currentMobiliario.activo
							}}
							validate = { values => {
								const errors = {};

								if(!values.tipo_id){
									errors.tipo_id = 'El campo es obligatorio'
								}else if(values.tipo_id == 0){
									errors.tipo_id = 'El campo es obligatorio'
								}

								if(!values.edificio_id){
									errors.edificio_id = 'El campo es obligatorio'
								}else if(values.edificio_id == 0){
									errors.edificio_id = 'El campo es obligatorio'
								}

								if(!values.nombre){
									errors.nombre = 'El campo es obligatorio'
								}

								if(!values.cantidad){
									errors.cantidad = 'El campo es obligatorio'
								}else if(values.cantidad == 0){
									errors.cantidad = 'La cantidad debe ser mayor que 0'
								}

								return errors;
							} }
							onSubmit = {(values, { setSubmitting}) => this.updateMobiliario(values, setSubmitting)
							}
						>
							{({
								values,
								errors,
								touched,
								handleBlur,
								handleChange,
								handleSubmit,
								setFieldValue,
								isSubmitting
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
								<div className = 'form-group'>
									<label htmlFor = 'nombre'>Nombre del mueble</label>
									<input id = 'nombre' className = {`form-control ${errors.nombre && touched.nombre ? 'is-invalid' : ''}`}
										value = { values.nombre }
										name = 'nombre'
										onChange = { handleChange }
										onBlur = { handleBlur }
									/>
									{ errors.nombre && <div className = 'invalid-feedback'>{errors.nombre}</div> }
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
								<div className = 'form-row'>
									<div className = 'col-12'>
										<img src = { this.state.currentMobiliario.image }
											className = 'img-thumbnail'
											style = {{ maxWidth: '200px', maxHeight: '200px' }}
										/>
									</div>
									<div className = 'col-12'>
										<label htmlFor = 'image'>Imagen</label>
										<input className = {`form-control-file ${ errors.image && touched.image? 'is-invalid' : ''}`}
											id = 'image'
											name = 'image'
											accept='image/x-png,image/gif,image/jpeg'
											type = 'file'
											onChange = { event => {
												setFieldValue('image', event.target.files[0])
											} }
										/>
										{errors.image && <div className = 'invalid-feedback'>{ errors.image }</div>}
									</div>
								</div>
								{/* <div className='form-check my-3'>
									<input className='form-check-input'
										type='checkbox'
										value = { values.activo }
										name = 'activo'
										id='activo'
										onChange = { e => {
											setFieldValue('activo', e.target.checked)
										}}
										checked = { values.activo }
									/>
									<label className='form-check-label' htmlFor='activo'>
										Activo
									</label>
								</div> */}
								<div className = 'form-group my-4'>
									<button className = 'btn btn-primary btn-lg btn-block'
										type = 'submit' disabled = { isSubmitting }
									>
										{ !isSubmitting && 'Guardar cambios' }
										{ isSubmitting && <span className="spinner-border text-light" role="status" /> }
									</button>
								</div>
							</form>
							)}
						</Formik>
						}
						{ this.state.isFetchingData &&
						<Loading mt = { 10 } />
						}
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
	fetchMobiliarios(){
		dispatch(startFetchMobiliario());
	}
})


export default connect(mapStateToProps, mapDispatchToProps)(MobiliarioUpdate);
