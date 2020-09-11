import React from 'react';
import { connect } from 'react-redux'
import swal from 'sweetalert2';
import { Formik } from 'formik';

import { startFetchOficinas } from '../../redux/actions/oficinasActions'

import Container from '../../components/pures/ContainerMaster'
import Europa3Api from '../../api';

class OficinaCreate extends React.Component{
	constructor(props){
		super(props);

		this.goToTab = this.goToTab.bind(this);
		this.renderOficinaFisica = this.renderOficinaFisica.bind(this);
		this.renderOficinaVirtual = this.renderOficinaVirtual.bind(this);
		this.registerOficina = this.registerOficina.bind(this);

		this.state = {
			tabIndex: 0,
		}
	}

	goToTab(index){
		this.setState({
			tabIndex: index
		})
	}

	registerOficina(values, setSubmit, resetForm){
		Europa3Api.registerOficina(values).then(resp => {
				this.props.fetchOficinas();
				swal.fire({
					icon: 'success',
					title: 'Correcto',
					text: resp.data.message,
				})
				resetForm()
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

	renderOficinaFisica(){
		return(
			<Formik
				initialValues = {{
					edificio_id: 0,
					size_id: 0,
					nombre: '',
					descripcion: '',
					dimension: '',
					capacidad_recomendada: 0,
					capacidad_maxima: 0,
					precio: 0,
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
								<select id = 'edificio' className = {`form-control ${errors.edificio_id && touched.edificio_id? 'is-invalid' : ''}`}
									value = { values.edificio_id }
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
								/>
								{errors.precio &&
								<div className = 'invalid-feedback'>
									{ errors.precio }
								</div>
								}
							</div>
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
							<a className = {`nav-link ${this.state.tabIndex == 2 ? 'active' : ''}`} onClick = {( )=> this.goToTab(2) } style = {{ cursor: 'pointer' }}>
								Oficina virtual
							</a>
						</li>
					</ul>
					<section className = 'pt-4 d-flex justify-content-center'>
						<div className = 'row'>
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
})

const mapDispatchToProps = dispatch => ({
	fetchOficinas(){
		dispatch(startFetchOficinas());
	}
})


export default connect(mapStateToProps, mapDispatchToProps)(OficinaCreate)

