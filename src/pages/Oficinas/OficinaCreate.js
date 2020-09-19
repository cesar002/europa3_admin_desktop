import React from 'react';
import { connect } from 'react-redux'
import swal from 'sweetalert2';
import { Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { startFetchOficinas } from '../../redux/actions/oficinasActions'
import * as mobiliarioActions from '../../redux/actions/mobiliarioActions'

import Container from '../../components/pures/ContainerMaster'
import ThumbnailPreview from '../../components/pures/ThumbnailImagePreview'

import Europa3Api from '../../api';

class OficinaCreate extends React.Component{
	constructor(props){
		super(props);

		this.goToTab = this.goToTab.bind(this);
		this.renderOficinaFisica = this.renderOficinaFisica.bind(this);
		this.renderOficinaVirtual = this.renderOficinaVirtual.bind(this);
		this.registerOficina = this.registerOficina.bind(this);
		this.setFiles = this.setFiles.bind(this);
		this.renderImageThumbnails = this.renderImageThumbnails.bind(this);
		this.removeImage = this.removeImage.bind(this);
		this.renderMobiliarioSelection = this.renderMobiliarioSelection.bind(this);
		this.fetchMobiliario = this.fetchMobiliario.bind(this);
		this.changeEdificioSelect = this.changeEdificioSelect.bind(this);
		this.addMobiliario = this.addMobiliario.bind(this);
		this.updateCantidad = this.updateCantidad.bind(this)
		this.deleteMobiliario = this.deleteMobiliario.bind(this);


		this.state = {
			currentEdificioId: 0,
			edificioIdError: null,
			tabIndex: 0,
			files: null,
			currentMobiliarioId: 0,
			errorMobiliario: null,
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevState.files && this.state.files){
			if(prevState.files.length !== this.state.files.length){
				if(this.state.files.length == 0){
					this.setState({
						files: null,
					}, ()=>{
						this.inputFiles.value = ''
					})
				}
			}
		}

		this.fetchMobiliario(prevState);
	}

	fetchMobiliario(prevState){
		if(prevState.currentEdificioId !== this.state.currentEdificioId){
			if(this.state.currentEdificioId !== 0){
				this.props.fetchMobiliario(this.state.currentEdificioId)
			}else{
				this.setState({
					mobiliario: [],
				})
			}
		}
	}

	removeImage(index){
		const newImages = this.state.files.filter((f, i) => i !== index);

		this.setState({
			files: newImages
		})
	}

	goToTab(index){
		this.setState({
			tabIndex: index
		})
	}

	changeEdificioSelect(e){
		const value = e.target.value;
		const error = value == 0 ? 'Campo obligatorio' : null;
		this.setState({
			currentEdificioId: value,
			edificioIdError: error,
		})
	}

	setFiles(e){
		const files = Array.from(e.target.files)

		this.setState({
			files: files,
		})
	}

	addMobiliario(){
		if(this.state.currentMobiliarioId == 0){
			return
		}

		if(this.props.mobiliarioOficina.some(m => m.id == this.state.currentMobiliarioId)){
			return
		}

		this.setState({
			mobiliarioOficinaError: null,
		}, () => this.props.addMobiliario(this.state.currentMobiliarioId))
	}

	updateCantidad(id, cantidad){
		this.props.updateCantidad(id, cantidad)
	}

	deleteMobiliario(id){
		this.props.deleteMobiliario(id)
	}

	renderMobiliarioSelection(){
		return(
			<React.Fragment>
				<div className = 'form-row'>
					<div className = 'form-inline mb-3'>
						<label htmlFor = 'mobiliario'>Mobiliario:</label>
						<select id = 'mobiliario' className = {`form-control mx-3 ${this.props.mobiliarioOficinaError ? 'is-invalid' : ''}`}
							style = {{ minWidth: '10rem' }}
							value = {this.state.currentMobiliarioId}
							onChange = { e => this.setState({ currentMobiliarioId: e.target.value }) }
						>
							<option value = {0}>Seleccione mobiliario</option>
							{this.props.mobiliario.map(m => (
							<option value = {m.id} key = {m.id}>{m.nombre}</option>
							))}
						</select>
						{this.props.mobiliarioOficinaError && <span className = 'invalid-feedback'>{this.props.mobiliarioOficinaError}</span>}
						<button type = 'button' className = 'btn btn-primary btn-sm' onClick = { this.addMobiliario }>
							Agregar
						</button>
					</div>
				</div>
				{ this.props.mobiliarioOficina.length > 0  &&
				<table className = 'table table-responsive'>
					<thead>
						<tr>
							<th scope = 'col'>Mueble</th>
							<th scope = 'col'>imagen</th>
							<th scope = 'col'>Cantidad</th>
							<th scope = 'col'></th>
						</tr>
					</thead>
					<tbody>
						{this.props.mobiliarioOficina.map(mob => (
						<tr key = {mob.id}>
							<th>{mob.modelo}</th>
							<th><img alt = {mob.modelo} src = {mob.image} style = {{ width: '40px', height: '40px' }} /></th>
							<th className = 'input-group-sm'>
								<input type = 'number' value = { mob.cantidad }
									className = 'form-control'
									onChange = { e => this.updateCantidad(mob.id, e.target.value) }
								/>
							</th>
							<th className = 'd-flex justify-content-between'>
								<div className = 'btn btn-danger btn-sm' onClick = { () => this.deleteMobiliario(mob.id) }>
									<FontAwesomeIcon icon = { faTrashAlt } />
								</div>
							</th>
						</tr>
						))}
					</tbody>
				</table>
				}
			</React.Fragment>
		)
	}

	renderImageThumbnails(){
		if(this.state.files){
			if(this.state.files.length > 0){
				return (
					<div className = 'form-row py-4'>
						{ this.state.files.map((file, i) =>(
							<div className = {`col-6 col-sm-3 ${ this.state.files.length >= 3? 'mx-3' : 'mx-5' }`}
								key = {file.name}
							>
								<React.Fragment>
									<div className = 'btn btn-danger btn-sm float-right' style = {{ position: 'absolute' }}
										onClick = { () => this.removeImage(i) }
									>
										<FontAwesomeIcon icon = { faTrashAlt } />
									</div>
									<ThumbnailPreview file = { file } />
								</React.Fragment>
							</div>
						)) }
					</div>
				)
			}
		}
	}

	registerOficina(values, setSubmit, resetForm){
		if(this.state.currentEdificioId == 0){
			this.setState({
				edificioIdError: 'Campo obligatorio'
			}, ()=>console.log(this.state.edificioIdError))

			setSubmit(false)
			return
		}
		if(this.props.mobiliarioOficina.length == 0){
			this.setState({
				mobiliarioOficinaError: 'Campo obligatorio',
			})
			setSubmit(false);
			return
		}
		const { files } = this.state
		const data = new FormData();
		data.append('edificio_id', this.state.currentEdificioId)
		Object.keys(values).map(key => {
			data.append(key, values[key]);
		})
		this.props.mobiliarioOficina.forEach(m => {
			for (let index = 0; index < m.cantidad; index++) {
				data.append('mobiliario[]', m.id)
			}
		})
		if(files){
			files.forEach(file => {
				data.append('images[]', file)
			})
		}

		Europa3Api.registerOficina(data)
		.then(resp => {
				this.props.fetchOficinas();
				swal.fire({
					icon: 'success',
					title: 'Correcto',
					text: 'Oficina registrada con éxito',
				})
				this.setState({ files: null }, () => {
					resetForm();
					this.props.clearMobiliarioOficina();
					this.inputFiles.value = ''
				})
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
					size_id: 0,
					nombre: '',
					descripcion: '',
					dimension: '',
					capacidad_recomendada: '',
					capacidad_maxima: '',
					precio: '',
					tipo_oficina_id: 1,
				}}
				validate = {values => {
					const errors = {};

					if(!values.nombre){
						errors.nombre = 'Campo obligatorio';
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
								<select id = 'edificio' className = {`form-control ${this.state.edificioIdError ? 'is-invalid' : ''}`}
									value = { this.state.currentEdificioId}
									name = 'edificio_id'
									onChange = { this.changeEdificioSelect }
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
								{this.state.edificioIdError &&
								<div className = 'invalid-feedback'>
									{this.state.edificioIdError}
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
							<label htmlFor = 'images-input'>Imagenes de la oficina</label>
							<input id = 'images-input' className = 'form-control-file'
								type = 'file'
								name = 'images[]'
								onChange = { this.setFiles }
								multiple
								accept='image/x-png,image/gif,image/jpeg'
								ref = {el => this.inputFiles = el}
							/>
						</div>
						{ this.renderImageThumbnails() }
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
									style = {{ maxWidth: '10rem' }}
								/>
								{errors.precio &&
								<div className = 'invalid-feedback'>
									{ errors.precio }
								</div>
								}
							</div>
						</div>
						{ this.renderMobiliarioSelection() }
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
	mobiliario: state.mobiliarioData.mobiliarioCreate.mobiliario,
	mobiliarioOficina: state.mobiliarioData.mobiliarioCreate.mobiliarioOficina,
})

const mapDispatchToProps = dispatch => ({
	fetchOficinas(){
		dispatch(startFetchOficinas());
	},
	fetchMobiliario(edificioId){
		dispatch(mobiliarioActions.startFetchMobiliarioByEdificioId(edificioId))
	},
	addMobiliario(id){
		dispatch(mobiliarioActions.addMobiliarioToMobiliarioOficina(id))
	},
	updateCantidad(id, cantidad){
		dispatch(mobiliarioActions.updateCantidadMobiliarioToMobiliarioOficina(id, cantidad))
	},
	deleteMobiliario(id){
		dispatch(mobiliarioActions.deleteMobiliarioInMobiliarioOficina(id))
	},
	clearMobiliarioOficina(){
		dispatch(mobiliarioActions.clearMobiliarioOficina())
	},
})


export default connect(mapStateToProps, mapDispatchToProps)(OficinaCreate)

