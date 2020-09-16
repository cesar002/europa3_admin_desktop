import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import * as edificosActions from '../../redux/actions/edificioAction'
import * as oficinaActions from '../../redux/actions/oficinasActions'

import Container from '../../components/pures/ContainerMaster'
import Loading from '../../components/pures/LoadingSpinner'
import EmptyScreen from '../../components/pures/EmptyScreen'

class Oficinas extends React.Component{

	constructor(props) {
		super(props);

		this.renderOficinas = this.renderOficinas.bind(this);
		this.renderLoadinfgScreen = this.renderLoadinfgScreen.bind(this);
		this.renderEmptyScreen = this.renderEmptyScreen.bind(this);
		this.showOficina = this.showOficina.bind(this);

		this.state = {
			currentEdificioId: 0
		}
	}

	componentDidMount(){
		if(this.props.edificios.length == 0){
			this.props.fetchEdificios();
		}
		if(this.props.oficinas.length == 0){
			this.props.fetchOficinas();
		}
	}

	showOficina(idOficina){
		this.props.selectOficina(idOficina)
		this.props.history.push('/oficinas/update');
	}

	renderEmptyScreen(){
		if(this.props.oficinas.length == 0 && this.props.oficinasStatus.finish){
			return <EmptyScreen text = 'Sin oficinas registradas' mt = {10} />
		}
	}

	renderLoadinfgScreen(){
		if(this.props.oficinasStatus.start){
			return (
				<div className = 'h-100 w-100 d-flex justify-content-center' style = {{ marginTop: '8rem' }}>
					<Loading text = 'Cargando oficinas...' />
				</div>
			)
		}
	}

	renderOficinas(){
		if(this.props.oficinas.length > 0){
			return this.props.oficinas.map(oficina => (
				<div key = {oficina.id} className = 'col-10 col-sm-6 col-md-6 col-lg-4'>
					<div className = 'card mb-3 shadow-sm p-2 mb-5 bg-white rounded' style = {{ maxWidth: '19rem' }}>
						<img className = 'card-img-top rounded' alt = {oficina.nombre} src = 'https://inmobiliare.com/himalaya/wp-content/uploads/2020/04/Home-office-y-su-influencia-en-el-dise%C3%B1o-de-oficinas-1536x1024.jpg' />
						<div className = 'card-body'>
							<h5 className = 'card-title'>{oficina.nombre}</h5>
							<h6 className = 'card-subtitle mb-2 text-muted'>Tamaño: {oficina.size_tipo.tipo} - {oficina.size}</h6>
						</div>
						<div className = 'card-footer'>
							<div className = 'btn btn-primary btn-sm mx-1' onClick = { () => this.showOficina(oficina.id) }>
								<FontAwesomeIcon icon = { faEye } />
							</div>
							<div className = 'btn btn-danger btn-sm mx-1'>
								<FontAwesomeIcon icon = { faTrashAlt } />
							</div>
						</div>
					</div>
				</div>
			))
		}
	}

	render(){
		return(
			<Container title = 'Oficinas'>
				<section className = 'px-4 mt-3'>
					<div className = 'row mt-2'>
						<div className = 'form-inline'>
							<div className = 'form-group'>
								<Link className = 'btn btn-primary btn-sm' to = '/oficinas/create'>
									<FontAwesomeIcon icon = { faPlusCircle } className = 'mr-2' />
									Registrar oficina
								</Link>
							</div>
							<div className = 'form-group ml-4'>
								<label htmlFor = 'edificio'>Edificio:</label>
								<select id = 'edificio'
									className = 'form-control ml-2 form-control-sm'
									value = {this.state.currentEdificioId}
									disabled = { !this.props.edificiosStatus.success || !this.props.oficinasStatus.finish }
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
					<div className = 'row mt-5'>
						{ this.renderLoadinfgScreen() }
						{ this.renderEmptyScreen() }
						{ this.renderOficinas() }
					</div>
				</section>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	edificios: state.edificiosData.edificios,
	edificiosStatus: state.edificiosData.status.statusEdificios,
	oficinas: state.oficinasData.oficinasFilter,
	oficinasStatus: state.oficinasData.status.oficinasStatus,
})

const mapDispatchToProps = dispatch => ({
	fetchEdificios(){
		dispatch(edificosActions.startFetchEdificios())
	},
	fetchOficinas(){
		dispatch(oficinaActions.startFetchOficinas())
	},
	selectOficina(idOficina){
		dispatch(oficinaActions.findOficinaById(idOficina))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Oficinas))
