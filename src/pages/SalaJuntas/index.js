import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import Container from '../../components/pures/ContainerMaster';
import CardOficinaSala from '../../components/pures/CardOficinaSala';
import EmptyScreen from '../../components/pures/EmptyScreen';
import LoadingScreen from '../../components/pures/LoadingScreen';

class SalaJuntas extends React.Component{
	constructor(props){
		super(props);

		this.renderSalasJuntas = this.renderSalasJuntas.bind(this);
		this.renderEmptyScreen = this.renderEmptyScreen.bind(this);
		this.renderLoadingScreen = this.renderLoadingScreen.bind(this);

		this.state = {
			currentEdificioId: 0,
		}
	}

	renderLoadingScreen(){
		if(this.props.salaJuntasStatus.start){
			return <LoadingScreen text = 'Cargando sala de juntas' mt = { 10 } />
		}
	}

	renderEmptyScreen(){
		if(this.props.salaJuntas.length == 0){
			return <EmptyScreen text = 'No hay salas de juntas registradas aún' mt = { 10 } />
		}
	}

	renderSalasJuntas(){
		if(this.props.salaJuntas.length > 0){
			return this.props.salaJuntas.map(s => (
				<CardOficinaSala key = { s.id }
					id = { s.id }
					nombre = { s.nombre }
					precio = { s.precio }
					dimensiones = { s.dimensiones }
					urlImage = { s.images[0].url }
					tipo_size = 'Alo'
				/>
			))
		}
	}

	render(){
		return(
			<Container title = 'Salas de juntas'>
				<section className = 'mt-3 px-4'>
					<div className = 'row mt-2'>
						<div className = 'form-inline'>
							<div className = 'form-group'>
								<Link className = 'btn btn-primary btn-sm' to = '/sala-juntas/create'>
									<FontAwesomeIcon icon = { faPlusCircle } className = 'mr-2' />
									Registrar oficina
								</Link>
							</div>
							<div className = 'form-group ml-4'>
								<label htmlFor = 'edificio'>Edificio:</label>
								<select id = 'edificio'
									value = { this.state.currentEdificioId }
									className = 'form-control ml-2 form-control-sm'
									style = {{ minWidth: '9rem' }}
								>
									<option value = {0}>Todos</option>
									{this.props.edificios.map(edi => (
									<option key = {edi.id} value = {edi.id}>
										{edi.nombre}
									</option>
									))}
								</select>
							</div>
						</div>
					</div>
					<div className = 'row px-3'>
						{ this.renderSalasJuntas() }
						{ this.renderEmptyScreen() }
						{ this.renderLoadingScreen() }
					</div>
				</section>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	edificios: state.edificiosData.edificios,
	salaJuntas: state.salaJuntasData.salaJuntasFilter,
	salaJuntasStatus: state.salaJuntasData.status.salaJuntas,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SalaJuntas)
