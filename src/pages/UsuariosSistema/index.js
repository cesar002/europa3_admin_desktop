import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import $ from "jquery";
import swal from 'sweetalert2';

import Container from '../../components/pures/ContainerMaster';
import LoadingScreen from '../../components/pures/LoadingScreen';
import EmptyScreen from '../../components/pures/EmptyScreen';

import Europa3Api from '../../api';

import * as gestionUsuariosActions from '../../redux/actions/gestionUsuariosActions';
import Swal from 'sweetalert2';

class UsuariosSistema extends Component {

	constructor(props){
		super(props);

		this.registrarUsuario = this.registrarUsuario.bind(this)

	}

	async registrarUsuario(_data, setSubmitting, resetForm){
		try {
			const data = new FormData();
			Object.keys(_data).forEach(k => {
				data.append(k, _data[k])
			})

			const resp = await Europa3Api.registerUserAdmin(data)

			if(resp.status !== 'success')
				throw resp.data;

			Swal.fire('Correcto', 'Usuario registrado', 'success')

			this.props.fetchUsers()

			$("#newUser").modal("toggle");
			resetForm()
		} catch (error) {
			Swal.fire('Error', 'Ocurrió un error al registrar al usuario', 'error')
		}finally{
			setSubmitting(false)
		}
	}

	render() {
		return (
			<Container
				title = 'Usuarios del sistema'
			>

				<div className = 'row my-3'>
					<div className = 'col-6'>
						<button className = 'btn btn-primary' data-toggle="modal" data-target="#newUser">
							Agregar un nuevo usuario
						</button>
					</div>
				</div>

				<div className='row mt-3'>
					<div className='col-12'>
						<div className='card'>
							<div className='card-body'>
								<table className='table'>
									<thead>
										<tr>
											<th>Usuario</th>
											<th>Nombre</th>
											<th>Avatar</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{ this.props.users.map(u =>
										<tr>
											<td>{ u.username }</td>
											<td>{ u.infoPersonal.nombre } { u.infoPersonal.ape_pat } { u.infoPersonal.ape_mat }</td>
											<td>
												{u.infoPersonal.avatar !== null &&
												<img className = 'img-fluid'
													alt = {`${u.username} - avatar`}
													style={{ maxWidth: '50px' }}
													src = { u.infoPersonal.avatar  }
												/>
												}
											</td>
											<td></td>
										</tr>
										) }
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>

				<div className="modal fade" id="newUser" tabindex="-1" role="dialog" aria-labelledby="newUserLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
							<h5 className="modal-title" id="newUserLabel">Modal title</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							</div>
								<Formik
									initialValues = {{
										username: '',
										password: '',
										password_confirmation: '',
										edificio_id: 1,
										nombre: '',
										ape_pat: '',
										ape_mat: '',
										avatar_image: '',
									}}
									validate = { values => {
										const errors = {};

										if(!values.username){
											errors.username = 'Campo obligatorio'
										}

										if(!values.password){
											errors.password = 'Campo obligatorio'
										}else if(values.password.length < 5){
											errors.password = 'La constraseña debe ser de al menos 5 caracteres'
										}

										if(!values.password_confirmation){
											errors.password_confirmation = 'Campo obligatorio'
										}else if(values.password_confirmation != values.password){
											errors.password_confirmation = 'La contraseña no coincide'
										}

										return errors
									}}
									onSubmit = { (values, {setSubmitting, resetForm }) =>  this.registrarUsuario(values, setSubmitting, resetForm)}
								>
									{({
										values,
										errors,
										touched,
										handleChange,
										handleBlur,
										handleSubmit,
										setFieldValue,
										isSubmitting,
									}) => (
									<React.Fragment>
										<div className="modal-body">
											<div className='form-row'>
												<div className='col-6'>
													<label form='username'>Nombre de usuario</label>
													<input
														id = 'username'
														type = 'text'
														value = { values.username }
														className = {`form-control ${ errors.username && touched.username ? 'is-invalid' : '' }`}
														onChange = { handleChange }
														onBlur = { handleBlur }
														name = 'username'
													/>
													{ errors.username && <span className = 'invalid-feedback'>{ errors.username }</span> }
												</div>
											</div>
											<div className = 'form-row'>
												<div className = 'col-6'>
													<label form='pass'>Contraseña</label>
													<input type = 'password'
														id='pass'
														value = { values.password }
														onBlur = {handleBlur}
														onChange = {handleChange}
														name = 'password'
														className = {`form-control ${ errors.password && touched.password ? 'is-invalid' : '' }`}
													/>
													{ errors.password && <span className = 'invalid-feedback'>{ errors.password }</span> }
												</div>
												<div className = 'col-6'>
												<label form='pass_confirmed'>Confirmar Contraseña</label>
													<input type = 'password'
														id='pass_confirmed'
														value = { values.password_confirmation }
														onBlur = {handleBlur}
														onChange = {handleChange}
														name = 'password_confirmation'
														className = {`form-control ${ errors.password_confirmation && touched.password_confirmation ? 'is-invalid' : '' }`}
													/>
													{ errors.password_confirmation && <span className = 'invalid-feedback'>{ errors.password_confirmation }</span> }
												</div>
											</div>
											<div className = 'form-group mt-2'>
												<label form='nombre'>Nombre</label>
												<input
													id='nombre'
													name = 'nombre'
													type = 'text'
													className = {`form-control ${errors.nombre && touched.nombre ? 'is-invalid' : ''}`}
													value = { values.nombre }
													onChange = { handleChange }
													onBlur = { handleBlur }
												/>
												{ errors.nombre && <span className = 'invalid-feedback'>{ errors.nombre }</span> }
											</div>
											<div className = 'form-group mt-2'>
												<label form='ape_pat'>Apellido paterno</label>
													<input
														id='ape_pat'
														type = 'text'
														className = {`form-control ${errors.ape_pat && touched.ape_pat ? 'is-invalid' : ''}`}
														value = { values.ape_pat }
														onChange = { handleChange }
														onBlur = { handleBlur }
														name = 'ape_pat'
													/>
													{ errors.ape_pat && <span className = 'invalid-feedback'>{ errors.ape_pat }</span> }
											</div>
											<div className = 'form-group mt-2'>
												<label form='ape_mat'>Apellido materno</label>
													<input
														id='ape_mat'
														type = 'text'
														className = {`form-control ${errors.ape_mat && touched.ape_mat ? 'is-invalid' : ''}`}
														value = { values.ape_mat }
														onChange = { handleChange }
														onBlur = { handleBlur }
													/>
													{ errors.ape_mat && <span className = 'invalid-feedback'>{ errors.ape_mat }</span> }
											</div>
											<div className = 'form-group'>
												<label htmlFor = 'avatar_image'>Avatar</label>
												<input className = {`form-control-file ${ errors.avatar_image && touched.avatar_image? 'is-invalid' : ''}`}
													id = 'avatar_image'
													name = 'avatar_image'
													accept='image/x-png,image/gif,image/jpeg'
													type = 'file'
													onChange = { event => {
														setFieldValue('avatar_image', event.target.files[0])
													} }
												/>
												{errors.avatar_image && <div className = 'invalid-feedback'>{ errors.avatar_image }</div>}
											</div>
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-primary"
												onClick = { handleSubmit  }
												disabled = { isSubmitting }
											>
												{ isSubmitting &&
													<div className="spinner-border text-light spinner-border-sm" role="status" />
												}
												{ !isSubmitting && 'Crear nuevo usuario' }
											</button>
											<button type="button" className="btn btn-secondary" data-dismiss="modal"
												disabled = { isSubmitting }
											>
												Cancelar
											</button>
										</div>
									</React.Fragment>
									)}
								</Formik>
						</div>
					</div>
				</div>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	users: state.gestionUsuariosData.usuariosAdmin,
})

const mapDispatchToProps = dispatch => ({
	fetchUsers(){
		dispatch(gestionUsuariosActions.startFetchUsuariosAdmin())
	}
})

export default  connect(mapStateToProps, mapDispatchToProps)(UsuariosSistema);
