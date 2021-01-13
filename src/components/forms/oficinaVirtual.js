import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

const OficinaVirtual = ({
	isDisable = false,
	initialValues = {},
}) => {
	return(
		<Formik
			initialValues = {{

			}}
			validate = {values => {

			}}
			onSubmit = {()=>{

			}}
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
			<form>

			</form>
			)}
		</Formik>
	)
}

export default OficinaVirtual;
