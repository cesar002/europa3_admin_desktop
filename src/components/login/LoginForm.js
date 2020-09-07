import React from 'react'
import { Formik } from 'formik';
import * as Yup from "yup";

export default class LoginForm extends React.PureComponent{

	render(){
		return(
			<React.Fragment>
				<h3 className="login-heading mb-4">Bienvenido!</h3>
				<Formik
					initialValues={{
						username: this.props.loginData.username,
						password: this.props.loginData.password
					}}
					validationSchema={Yup.object().shape({
						username: Yup.string().required('Nombre de usuario requerido'),
						password: Yup.string().required('Contraseña requerida')
					})}
					onSubmit={(values, { setSubmitting }) => {
							this.props.loginHandle(values)
							setSubmitting(false);
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
						/* and other goodies */
						}) => (
						<form onSubmit={handleSubmit}>
							<div className="form-label-group">
								<input
									className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
									type="text"
									id="inputUserName"
									name="username"
									onChange={ handleChange }
									onBlur={handleBlur}
									value={values.username}
									autoFocus
								/>
								<label htmlFor="inputUserName">Nombre de usuario</label>
								{errors.username &&
								<div className="invalid-feedback">
									{errors.username}
								</div>
								}
							</div>
							<div className="form-label-group">
								<input
									className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
									name = "password"
									type="password"
									id="inputPassword"
									onChange={ handleChange }
									onBlur={ handleBlur }
									value={values.password}
								/>
								<label htmlFor="inputPassword">Contraseña</label>
								{errors.password &&
								<div className="invalid-feedback">
									{errors.password}
								</div>
								}
							</div>
							<button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
								type="submit" disabled={isSubmitting}
							>
							Iniciar sesión
							</button>
							{this.props.errorLogin &&
							<div className="text-center text-danger font-weight-bold">
								{ this.props.errorLogin.error }
							</div>
							}
							<div className="text-center">
								<a className="small" href="#">Olvide mi contraseña</a>
							</div>
						</form>
					)}
				</Formik>
			</React.Fragment>

		)
	}
}
