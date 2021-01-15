import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

const OficinaVirtual = ({
	edificios = [],
	isDisable = false,
	initialValues = {
		edificio_id,
		nombre,
		descripcion,
		precio,
		servicios: [],
	},
	submit = (values, setSubmitting, resetForm)=>{},
}) => {

	const _submit = (values, setSubmitting, resetForm) => {
		submit(values, setSubmitting, resetForm);
	}

	return(
		<Formik
			initialValues = {{ ...initialValues, }}
			validate = {values => {
				const errors = {};

				if(values.edificio_id == 0){
					errors.edificio_id = 'Debe seleccionar un edificio'
				}

				if(!values.nombre){
					errors.nombre = 'Campo obligatorio';
				}

				if(!values.precio){
					errors.precio = 'Campo obligatorio'
				} else if(values.precio <= 0){
					errors.precio = 'El precio debe ser mayor que 0'
				} else if(!/^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(values.precio)){
					errors.precio = 'Formato invalido'
				}

				return errors;
			}}
			onSubmit = {(values, { setSubmitting, resetForm  })=> _submit(values, setSubmitting, resetForm)}
		>
			{({
				errors,
				touched,
				values,
				handleChange,
				handleBlur,
				isSubmitting,
				handleSubmit
			})=>(
			<form onSubmit = { handleSubmit }>
				<div className = 'form-group'>
					<label htmlFor='nombre'>Nombre</label>
					<input id = 'nombre' type = 'text'
						className={`form-control ${errors.nombre && touched.nombre ? 'is-invalid' : ''}`}
						name = 'nombre'
						value = { values.nombre }
						onChange = { handleChange }
						onBlur = { handleBlur }
						disabled = { isDisable }
					/>
					{ errors.nombre && <div className = 'invalid-feedback'>{ errors.nombre }</div> }
				</div>
				<div className = 'form-group'>
						<label htmlFor='edificio'>Edificio</label>
						<select id = 'edificio'
							className = {`form-control ${ errors.edificio_id && touched.edificio_id ? 'is-invalid' : '' }`}
							disabled = { isDisable }
							value = { values.edificio_id }
							name = 'edificio_id'
							onChange = { handleChange }
							onBlur = { handleBlur }
						>
							<option value = {0}>Seleccione un edificio</option>
							{ edificios.map(ed =>
							<option key = {ed.id} value = {ed.id}>{ed.nombre}</option>
							) }
						</select>
						{ errors.edificio_id && <div className = 'invalid-feedback'>{ errors.edificio_id }</div> }
				</div>
				<div className = 'form-group'>
					<label htmlFor = 'descripcion'>Descripción</label>
					<textarea className = 'form-control' id = 'descripcion'
						rows = { 6 }
						value = { values.descripcion }
						name = 'descripcion'
						onChange = { handleChange }
						onBlur = { handleBlur }
						disabled = { isDisable }
					/>
				</div>
				<div className = 'form-group'>
						<label htmlFor = 'precio'>Precio</label>
						<input type = 'text'
							id = "precio"
							className={`form-control ${errors.precio && touched.precio ? 'is-invalid' : ''}`}
							value = { values.precio }
							name = 'precio'
							onChange = { handleChange }
							onBlur = { handleBlur }
							disabled = { isDisable }
						/>
						{ errors.precio && <div className = 'invalid-feedback'>{ errors.precio }</div> }
				</div>
				<div className = 'form-group'>
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

export default OficinaVirtual;
