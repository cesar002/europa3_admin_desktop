import React from 'react'
import { Formik } from 'formik';
import * as Yup from "yup";

import SVGSpinner from '../pures/SVGSpinner'

export default class LoginForm extends React.PureComponent{

	render(){
		return(
				<Formik
					initialValues={{ username: '', password: '' }}
					validationSchema={Yup.object().shape({
						username: Yup.string().required('Nombre de usuario requerido'),
						password: Yup.string().required('Contraseña requerida')
					})}
					onSubmit={(values, { setSubmitting, resetForm }) => {
							// this.props.loginHandle(values)
							setTimeout(() => {
								console.log(values)
								setSubmitting(false);
							}, 400);
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
						}) => (
						<form className = 'bg-white shadow-md rounded my-20 w-4/5 sm:w-3/5 px-10 py-12'
							onSubmit={handleSubmit}
						>
							<div className = 'mb-8'>
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
									Nombre de usuario
								</label>
								<input className={`shadow appearance-none border ${errors.username && touched.username ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
									id="username"
									type="text"
									name = "username"
									placeholder="Nombre de usuario"
									onChange={ handleChange }
									onBlur={handleBlur}
									value={values.username}
									autoFocus
								/>
								{errors.username && touched.username &&
								<p className="text-red-500 text-xs italic">{ errors.username}</p>
								}
							</div>
							<div className = 'mb-8'>
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
									Contraseña
								</label>
								<input className={`shadow appearance-none border ${errors.password && touched.password ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
									id="password"
									type="password"
									name = "password"
									placeholder="Nombre de usuario"
									onChange={ handleChange }
									onBlur={ handleBlur }
									value={values.password}
								/>
								{errors.password && touched.password &&
								<p className="text-red-500 text-xs italic">{errors.password}</p>
								}
							</div>
							<div className = 'flex justify-center mt-12'>
								<button className = 'flex justify-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline py-4'
									type="submit"
									disabled = { isSubmitting }
								>
									{!isSubmitting &&
									<span>Iniciar sesión</span>
									}
									{isSubmitting &&
									<SVGSpinner />
									}
								</button>
							</div>
						</form>
					)}
				</Formik>
		)
	}
}

