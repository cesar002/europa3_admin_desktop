import React from 'react';
import { connect } from 'react-redux';
import { Formik, FieldArray } from 'formik';
import swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenAlt } from '@fortawesome/free-solid-svg-icons';

import Container from '../../components/pures/ContainerMaster';

class SalaJuntasUpdate extends React.Component{
	constructor(props){
		super(props);

		this.goToTab = this.goToTab.bind(this);
		this.validateForm = this.validateForm.bind(this);

		this.state = {
			tabIndex: 0,
		}
	}

	goToTab(i){
		this.setState({
			tabIndex: i
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

	render(){
		return(
			<Container
				title = {this.props.salaJuntas.nombre || 'Cargando...'}
				toBack = '/sala-juntas'
			>
				<ul>
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
						<Formik
							initialValues = {{
								edificio_id: this.props.salaJuntas.edificio_id,
								size_id: this.props.salaJuntas.size_tipo.id,
								tipo_tiempo_id: this.props.salaJuntas.tipo_renta.id,
								nombre: this.props.salaJuntas.nombre,
								descripcion: this.props.salaJuntas.descripcion,
								size_dimension: this.props.salaJuntas.dimension,
								capacidad_recomendada: this.props.salaJuntas.capacidad_recomendada,
								capacidad_maxima: this.props.salaJuntas.capacidad_maxima,
								precio: this.props.salaJuntas.precio,
								servicios: this.props.salaJuntas.servicios,
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
							<form onSubmit = { handleSubmit }>

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
	salaJuntas: state.salaJuntasData.salaJuntasSelected,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SalaJuntasUpdate)
