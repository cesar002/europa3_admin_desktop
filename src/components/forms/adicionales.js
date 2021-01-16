import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';


const Adicionales = ({
	edificios = [],
	unidades = [],
	isDisable = false,
	initialValues = {
		edificio_id,
		unidad_id,
		nombre,
		descripcion,
		unidad_base,
		cantidad_maxima,
		precio,
	},
	submit = (values, setSubmitting, resetForm)=>{},
}) => {

	const _submit = (values, setSubmitting, resetForm) => {
		submit(values, setSubmitting, resetForm);
	}

	return(
		<Formik
			initialValues = {{ ...initialValues }}
			validate = {values=> {
				const errors = {};

				if(values.edificio_id == 0){
					errors.edificio_id = 'Campo obligatorio';
				}

				if(values.unidad_id == 0){
					errors.unidad_id = 'Campo obligatorio'
				}

				if(!values.nombre){
					errors.nombre = 'Campo obligatorio'
				}

				if(!values.unidad_base){
					errors.unidad_base = 'Campo obligatorio'
				}else if(values.unidad_base <= 0){
					errors.unidad_base = 'La unidad base debe ser de al menos 1'
				}

				if(!values.cantidad_maxima){
					errors.cantidad_maxima = 'Campo obligatorio';
				}else if(values.cantidad_maxima <= 0){
					errors.cantidad_maxima = 'La cantidad máxima debe ser de al menos 1';
				}

				if(!values.precio){
					errors.precio = 'Campo obligatorio';
				}else if(values.precio <= 0){
					errors.precio = 'El precio debe ser mayor que 0';
				}

				return errors;
			}}
			onSubmit = {(values, { setSubmitting, resetForm  })=> _submit(values, setSubmitting, resetForm)}
		>
			{({
				values,
				errors,
				touched,
				handleBlur,
				handleChange,
				handleSubmit,
				isSubmitting
			})=>(
				<form onSubmit = { handleSubmit }>
					<div className = 'form-group'>
						<label htmlFor='edificio'>Edificio</label>
						<select
							id = 'edificio'
							name = 'edificio_id'
							value = { values.edificio_id }
							onChange = { handleChange }
							onBlur = { handleBlur }
							className = {`form-control ${errors.edificio_id && touched.edificio_id ? 'is-invalid' : ''}`}
							disabled = { isDisable }
						>
							<option value = {0}>Seleccione un edificio</option>
							{ edificios.map(ed =>
							<option key = {ed.id} value = {ed.id}>{ed.nombre}</option>
							) }
						</select>
						{ errors.edificio_id && <span className = 'invalid-feedback'>{errors.edificio_id}</span> }
					</div>
					<div className = 'form-group'>
						<label htmlFor = 'unidad_id'>Tipo de unidad</label>
						<select id = 'unidad_id'
							name = 'unidad_id'
							value = { values.unidad_id }
							onChange = { handleChange }
							onBlur = { handleBlur }
							className = {`form-control ${ errors.unidad_id && touched.unidad_id }`}
							disabled = { isDisable }
						>
							<option value = {0}>Seleccione un tipo de unidad</option>
							{ unidades.map(uni =>
							<option key = {uni.id} value = {uni.id}>{uni.unidad}</option>
							) }
						</select>
					</div>
					<div className = 'form-group'>
						<label htmlFor='nombre'>Nombre</label>
						<input
							id = 'nombre'
							value = { values.nombre }
							name = 'nombre'
							onChange = { handleChange }
							onBlur = { handleBlur }
							className = { `form-control ${errors.nombre && touched.nombre ? 'is-invalid' : ''}` }
							disabled = { isDisable }
						/>
						{ errors.nombre && <span className = 'invalid-feedback'>{errors.nombre}</span> }
					</div>
					<div className = 'form-group'>
						<label htmlFor='descripcion'>Descripción</label>
						<textarea
							id = 'descripcion'
							value = { values.descripcion }
							onChange = { handleChange }
							onBlur = { handleBlur }
							className = { `form-control ${errors.descripcion && touched.descripcion ? 'is-invalid' : ''}` }
							disabled = { isDisable }
							rows = { 6 }
						/>
					</div>
					<div className = 'form-row'>
						<div className = 'col'>
							<label htmlFor = 'unidad_base'>Unidad base</label>
							<input
								id = 'unidad_base'
								name = 'unidad_base'
								value = { values.unidad_base }
								onChange = { handleChange }
								onBlur = { handleBlur }
								className = {`form-control ${ errors.unidad_base && touched.unidad_base ? 'is-invalid' : '' }`}
								disabled = { isDisable }
							/>
							{ errors.unidad_base && <span className = 'invalid-feedback'>{errors.unidad_base}</span> }
						</div>
						<div className = 'col'>
							<label htmlFor = 'cantidad_maxima'>Cantidad máxima</label>
							<input
								id = 'cantidad_maxima'
								name = 'cantidad_maxima'
								value = { values.cantidad_maxima }
								onChange = { handleChange }
								onBlur = { handleBlur }
								className = { `form-control ${errors.cantidad_maxima && touched.cantidad_maxima ? 'is-invalid' : ''}` }
								disabled = { isDisable }
							/>
							{ errors.cantidad_maxima && <span className = 'invalid-feedback'>{errors.cantidad_maxima}</span> }
						</div>
						<div className = 'col'>
							<label htmlFor = 'precio'>Precio</label>
							<input
								id = 'precio'
								name = 'precio'
								value = { values.precio }
								onChange = { handleChange }
								onBlur = { handleBlur }
								className = {`form-control ${errors.precio && touched.precio ? 'is-invalid' : ''}`}
								disabled = { isDisable }
							/>
							{ errors.precio && <span className = 'invalid-feedback'>{errors.precio}</span> }
						</div>
					</div>
					<div className = 'form-group mt-4'>
						<button className = 'btn btn-primary  btn-lg btn-block'
							disabled = { isSubmitting || isDisable }
						>
							{!isSubmitting &&
							'Guardar'
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

export default Adicionales;
