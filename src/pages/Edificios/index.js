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

	}

	componentDidMount(){
		this.props.fetchEdificios();
	}

	renderEdificios(){
		return [1, 2, 3, 4, 5, 6].map(i => {
			return(
				<div className = 'col-10 col-md-6 col-lg-3'>
					<div className="card bg-light mb-3" style = {{ maxWidth: '20rem' }}>
						<div className="card-header">
							<div className="btn-group" role="group" aria-label="Basic example">
								<a className = 'btn btn-secondary btn-sm' href = '#'>
									<FontAwesomeIcon icon = { faEye } />
								</a>
								<a className = 'btn btn-secondary btn-sm' href = '#'>
									<FontAwesomeIcon icon = { faPencilAlt } />
								</a>
							</div>
						</div>
						<div className="card-body">
							<h5 className="card-title">Light card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
						</div>
					</div>
				</div>
			)
		})
	}

	render(){
		return(
			<Container title = 'Edificios'>
				<section className = 'px-3'>
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
						{this.props.edificios.length < 0 &&
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
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edificio));
