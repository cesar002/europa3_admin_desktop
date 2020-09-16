import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenAlt } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert2';
import { Formik } from 'formik';


import Container from '../../components/pures/ContainerMaster'

class OficinaUpdate extends React.Component{
	constructor(props){
		super(props);

		this.toggleEdit = this.toggleEdit.bind(this)
		this.updateImages = this.updateImages.bind(this)
		this.updateInfo = this.updateInfo.bind(this)
		this.renderUpdateImages = this.renderUpdateImages.bind(this)

		this.state  = {
			isEdit: false,
			currentTabIndex: 0,
		}
	}

	updateInfo(){

	}

	updateImages(){

	}

	goToTab(index){
		this.setState({
			currentTabIndex: index
		})
	}

	toggleEdit(){
		const isEdit = this.state.isEdit
		this.setState({
			isEdit: !isEdit,
		})
	}

	renderTab(){
		return(
			<ul className = 'nav nav-tabs mt-4'>
				<li className = 'nav-item'>
					<a className = {`nav-link ${this.state.currentTabIndex == 0 ? 'active' : ''}`}
						onClick = {( )=> this.goToTab(0) }
						style = {{ cursor: 'pointer' }}
					>
						Información
					</a>
				</li>
				<li className = 'nav-item'>
					<a className = {`nav-link ${this.state.currentTabIndex == 1 ? 'active' : ''}`}
						onClick = {( )=> this.goToTab(1) }
						style = {{ cursor: 'pointer' }}
					>
						Imagenes
					</a>
				</li>
			</ul>
		)
	}

	renderForm(){
		return(
			<Formik
				initialValues = {{
					edificio_id: this.props.oficina.edificio.id,
					size_id: this.props.oficina.size_tipo.id,
					nombre: this.props.oficina.nombre,
					descripcion: this.props.oficina.descripcion,
					dimension: this.props.oficina.size,
					capacidad_recomendada: this.props.oficina.capacidad.recomendada,
					capacidad_maxima: this.props.oficina.capacidad.maxima,
					precio: this.props.oficina.precio,
					tipo_oficina_id: 1,
				}}
				validate = {values => {
					const errors = {};

					if(!values.nombre){
						errors.nombre = 'Campo obligatorio';
					}

					if(values.edificio_id == 0){
						errors.edificio_id = 'Campo obligatorio';
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

					return errors;
				}}
				onSubmit = {(values)=>{

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
						<div className = 'form-row'>
							<div className = 'form-group col-12 col-md-6'>
								<label htmlFor = 'edificio'>Edificio:</label>
								<select id = 'edificio' className = {`form-control ${errors.edificio_id && touched.edificio_id? 'is-invalid' : ''}`}
									value = { values.edificio_id }
									disabled = { !this.state.isEdit }
									name = 'edificio_id'
									onChange = { handleChange }
									onBlur = { handleBlur }
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
									disabled = { !this.state.isEdit }
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
								disabled = { !this.state.isEdit }
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
								disabled = { !this.state.isEdit }
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
							<label htmlFor = 'dimensiones'>Dimensiones de la oficina</label>
							<input id = 'dimensiones'
								name = 'dimension'
								value = { values.dimension }
								disabled = { !this.state.isEdit }
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
									disabled = { !this.state.isEdit }
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
									disabled = { !this.state.isEdit }
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
									disabled = { !this.state.isEdit }
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
						{this.state.isEdit &&
						<div className = 'form-group'>
							<button className  = 'btn btn-primary btn-lg btn-block' disabled = {isSubmitting}>
								{!isSubmitting &&
								'Actualizar información'
								}
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

	renderUpdateImages(){
		return(
			<React.Fragment>
				<div className = 'row'>

				</div>
				<div className = 'row'>
					<button className = 'btn btn-primary btn-lg btn-block'>
						Actualizar imagenes
					</button>
				</div>
			</React.Fragment>
		)
	}

	render(){
		return(
			<Container toBack = '/oficinas'
				title = { this.props.oficina.nombre }
				elementHeader = {
					<div className = {`btn btn-primary ${ this.state.isEdit ? 'active' : '' }`}
						onClick = { this.toggleEdit }
					>
						<FontAwesomeIcon icon = {faPenAlt} />
					</div>
				}
			>
				{ this.renderTab() }
				<section className = 'mt-2 px-3 d-flex justify-content-center'>
					{ this.state.currentTabIndex == 0 &&
					<div className = 'row'>
						{ this.renderForm() }
					</div>
					}
					{ this.state.currentTabIndex == 1 && this.renderUpdateImages() }
				</section>
			</Container>
		)
	}
}


const mapStateToProps = state => ({
	oficina: state.oficinasData.selectedOficina,
	edificios: state.edificiosData.edificios,
	oficinasSizes: state.configData.oficinasSizes,
})

const mapDispatchToProps = dispatch => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(OficinaUpdate)
