import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import Container from '../../components/pures/ContainerMaster'
import Loading from '../../components/pures/LoadingSpinner'
import EmptyScreen from '../../components/pures/EmptyScreen'

import * as edificiosActions from '../../redux/actions/edificioAction'

const LoadingScreen = ({ text }) => (
	<div className = 'h-100 w-100 d-flex justify-content-center' style = {{ marginTop: '8rem' }}>
		<Loading text = { text } />
	</div>
)

class Edificio extends React.Component{
	constructor(props){
		super(props);

		this.renderEdificios = this.renderEdificios.bind(this);
		this.selectEdificio = this.selectEdificio.bind(this);
	}

	componentDidMount(){
		if(this.props.edificios.length == 0){
			this.props.fetchEdificios();
		}
	}

	selectEdificio(id){
		this.props.selectEdificio(id)
		this.props.history.push('/edificios/update');
	}

	renderEdificios(){
		return this.props.edificios.map(edi => {
			return(
				<div key = {edi.id} className = 'col-10 col-md-4 col-lg-4'>
					<div className="card mb-3 shadow-sm p-3 mb-5 bg-white rounded" style = {{ maxWidth: '20rem' }}>
						<div className="card-body">
							<div className = 'card-title'>
								<div className = 'btn btn-primary btn-sm float-right mb-3'
									onClick = {() => this.selectEdificio(edi.id)}
								>
									<FontAwesomeIcon icon = { faEye } />
								</div>
							</div>
							<h5 className="card-title">{ edi.nombre }</h5>
							<p className="card-text">{ edi.direccion }</p>
						</div>
						<ul className = 'list-group list-group-flush'>
							<li className = 'list-group-item' style = {{fontSize: '0.8rem'}}>
								{edi.horas_servicio.apertura} - {edi.horas_servicio.cierre}
							</li>
							<li className = 'list-group-item' style = {{fontSize: '0.8rem'}}>
								Teléfono: {edi.telefono_1}
							</li>
							{edi.telefono_2 &&
							<li className = 'list-group-item' style = {{fontSize: '0.8rem'}}>
								Teléfono 2: {edi.telefono_2}
							</li>
							}
							<li className = 'list-group-item' style = {{fontSize: '0.8rem'}}>
								Recepción: {edi.telefono_recepcion}
							</li>
						</ul>
					</div>
				</div>
			)
		})
	}

	render(){
		return(
			<Container title = 'Edificios'>
				<section className = 'px-5 mt-3'>
					<div className = 'row'>
						<Link className = 'btn btn-primary btn-sm' to = '/edificios/create'>
							Registrar edificio
						</Link>
					</div>
					<div className = 'row mt-3'>
						{this.props.edificiosStatus.start &&
						<LoadingScreen text = 'Cargando edificios...' />
						}
						{this.props.edificiosStatus.finish && this.props.edificios.length == 0 &&
						<EmptyScreen text = 'No hay edificios registrados aun' mt = { 8 } />
						}
						{this.props.edificios.length > 0 &&
						this.renderEdificios()
						}
					</div>
				</section>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	edificiosStatus: state.edificiosData.status.statusEdificios,
	edificios: state.edificiosData.edificios,
});

const mapDispatchToProps = dispatch => ({
	fetchEdificios(){
		dispatch(edificiosActions.startFetchEdificios())
	},
	selectEdificio(id){
		dispatch(edificiosActions.findEdificioById(id))
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edificio));
