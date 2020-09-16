import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faPenAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import * as mobiliarioActions from '../../redux/actions/mobiliarioActions'

import Container from '../../components/pures/ContainerMaster';
import LoadingScreen from '../../components/pures/LoadingScreen';
import EmptyScreen from '../../components/pures/EmptyScreen';

class Mobiliario extends React.Component{

	constructor(props){
		super(props)

		this.selectEdificio = this.selectEdificio.bind(this);

		this.state = {
			currentEdificioId: 0,
		}
	}

	selectEdificio(event){
		const id = event.target.value
		this.setState({
			currentEdificioId: id
		})
	}

	renderMobiliarioTable(){
		return(
			<div className = 'table-responsive'>
				<table className = 'table table-sm'>
					<thead className = 'thead-dark'>
						<tr>
							<th scope = 'col'>#</th>
							<th scope = 'col'>Tipo</th>
							<th scope = 'col'>Marca</th>
							<th scope = 'col'>Modelo</th>
							<th scope = 'col'>Color</th>
							<th scope = 'col'>Descripción</th>
							<th scope = 'col'>Fotografia</th>
							<th scope = 'col'>Observaciones</th>
							<th scope = 'col'>Cantidad</th>
							<th scope = 'col'></th>
						</tr>
					</thead>
					<tbody>
						{ this.props.mobiliario.map((mob, i)=>(
							<tr key = {mob.id}>
								<th scope = 'row'>{i+1}</th>
								<td>{mob.tipo.nombre}</td>
								<td>{mob.marca}</td>
								<td>{mob.modelo}</td>
								<td>{mob.color}</td>
								<td>{mob.descripcion}</td>
								<td>
									<img alt = {mob.modelo} src = {mob.images} style = {{ maxHeight: '100px', maxWidth: '100px' }} />
								</td>
								<td>{mob.observaciones}</td>
								<td>{mob.cantidad}</td>
								<td className = 'd-flex justify-content-between'>
									<div className = 'btn btn-primary btn-sm'>
										<FontAwesomeIcon icon = { faPenAlt } />
									</div>
								</td>
							</tr>
						)) }
					</tbody>
				</table>
			</div>
		)
	}

	render(){
		return(
			<Container title = 'Mobiliario'>
				<section className = 'mt-4 px-4'>
					<div className = 'row'>
						<div className = 'form-inline'>
							<div className = 'form-group'>
								<Link className = 'btn btn-primary btn-sm' to = '/mobiliario/create'>
									<FontAwesomeIcon icon = { faPlusCircle } className = 'mr-2'  />
									Registrar mobiliario
								</Link>
							</div>
							<div className = 'form-group ml-4'>
							<label htmlFor = 'edificio'>Edificio:</label>
								<select id = 'edificio'
									className = 'form-control ml-2 form-control-sm'
									value = {this.state.currentEdificioId}
									style = {{ minWidth: '9rem' }}
									onChange = { this.selectEdificio }
								>
									<option value = {0}>Todos</option>
									{this.props.edificios.map(ed =>
									<option key = {ed.id} value = {ed.id}>{ed.nombre}</option>
									)}
								</select>
							</div>
						</div>
					</div>
					<div className = 'row mt-4'>
						{this.props.mobiliarioStatus.start && <LoadingScreen text = 'Cargando mobiliario...' />}
						{this.props.mobiliario.length == 0 && <EmptyScreen text = 'No hay mobiliario registrado' />}
						{ this.renderMobiliarioTable() }
					</div>
				</section>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	edificios: state.edificiosData.edificios,
	edificiosStatus: state.edificiosData.status.statusEdificios,
	mobiliario: state.mobiliarioData.mobiliarioFilter,
	mobiliarioStatus: state.mobiliarioData.status.mobiliarioStatus,
})

const mapDispatchToProps = dispatch => ({
	fetchMobiliario(){
		dispatch(mobiliarioActions.startFetchMobiliario())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Mobiliario);
