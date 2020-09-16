import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import Container from '../../components/pures/ContainerMaster'

class Mobiliario extends React.Component{

	constructor(props){
		super(props)

		this.state = {
			currentEdificioId: 0,
		}
	}

	render(){
		return(
			<Container title = 'Mobiliario'>
				<section className = 'mt-4 px-4'>
					<div className = 'row'>
						<div className = 'form-inline'>
							<div className = 'form-group'>
								<Link className = 'btn btn-primary btn-sm' to = ''>
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
								>
									<option value = {0}>Todos</option>
									{this.props.edificios.map(ed =>
									<option key = {ed.id} value = {ed.id}>{ed.nombre}</option>
									)}
								</select>
							</div>
						</div>
					</div>
					<div className = 'row'>

					</div>
				</section>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	edificios: state.edificiosData.edificios,
	edificiosStatus: state.edificiosData.status.statusEdificios,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Mobiliario);
