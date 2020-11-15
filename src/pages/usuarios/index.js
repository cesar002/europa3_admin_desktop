import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import * as usersActions from '../../redux/actions/usersAction'

import Container from '../../components/pures/ContainerMaster';
import LoadingScreen from '../../components/pures/LoadingScreen';
import EmptyScreen from '../../components/pures/EmptyScreen';


class Usuarios extends React.Component{
	constructor(props){
		super(props);

		this.search = this.search.bind(this);
	}

	componentDidMount(){
		this.props.fetchUsuarios();
	}



	search(e){
		this.props.searchUser(e.target.value)
	}

	render(){
		return(
			<Container title = 'Usuarios'>
				<section className = 'px-5 mt-3'>
					{ this.props.usuariosStatus.start &&
					<LoadingScreen mt = { 10 } text = 'Cargando usuarios...' />
					}
					{ !this.props.existUsuarios  && this.props.usuariosStatus.finish &&
					<EmptyScreen text = 'Aún no hay usuarios registrados' mt = { 8 } />
					}
					{ this.props.existUsuarios && this.props.usuariosStatus.finish &&
					<React.Fragment>
						<div className = 'row py-4 px-4'>
							<input placeholder = 'Buscar...' className = 'form-control'
								onChange = { this.search }
							/>
						</div>
						<div className = 'd-flex justify-content-center'>
							<table className = 'table'>
								<thead>
									<tr>
										<th scope = 'col'>ID</th>
										<th scope = 'col'>Email</th>
										<th scope = 'col'>Nombre</th>
										<th scope = 'col'></th>
									</tr>
								</thead>
								<tbody>
									{ this.props.usuarios.map(user => (
									<tr key = { user.id }>
										<th scope = 'row'>{ user.id }</th>
										<td>{ user.email }</td>
										<td>{ user.personal_data ? user.personal_data.nombre : 'No registrado' }</td>
										<td>
											<div className="btn-group" role="group">
												<button type="button" className="btn btn-primary btn-sm">
													<FontAwesomeIcon icon = { faEye } />
												</button>
												<button type="button" className="btn btn-warning btn-sm">
													<FontAwesomeIcon icon = { faTimesCircle } />
												</button>
											</div>
										</td>
									</tr>
									)) }
								</tbody>
							</table>
						</div>
					</React.Fragment>
					}
				</section>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	usuarios: state.usersData.usersFilter,
	usuariosStatus: state.usersData.status.users,
	existUsuarios: state.usersData.users.length > 0,
})

const mapDispatchToProps = dispatch => ({
	searchUser(word){
		dispatch(usersActions.searchUser(word))
	},
	fetchUsuarios(){
		dispatch(usersActions.startFetchUsers())
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(Usuarios);
