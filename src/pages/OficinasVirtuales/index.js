import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faDoorOpen, faTrash } from '@fortawesome/free-solid-svg-icons';

import Container from '../../components/pures/ContainerMaster';
import Loading from '../../components/pures/LoadingSpinner';
import EmptyScreen from '../../components/pures/EmptyScreen';

import * as oficinasVirtualesActions from '../../redux/actions/oficinasVirtualesActions';

class OficinasVirtuales extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<Container
				title = 'Oficinas virtuales'
			>
				<section className = 'px-4 mt-3'>
					<div className = 'row mt-2'>
						<div className = 'form-inline'>
							<div className = 'form-group'>
								<Link className = 'btn btn-primary btn-sm' to = '/oficinas/create'>
									<FontAwesomeIcon icon = { faPlusCircle } className = 'mr-2' />
									Registrar oficina
								</Link>
							</div>
						</div>
					</div>
					<div className = 'row px-3 mt-4'>
						{ this.props.oficinasVirtualesStatus.start &&
						<Loading />
						}
						{ this.props.oficinasVirtualesStatus.finish &&
						<React.Fragment>
							{this.props.oficinasVirtuales.length == 0 &&
							<EmptyScreen
								text = 'No hay oficinas virtuales registradas'
								mt = { 10 }
							/>
							}
							{ this.props.oficinasVirtuales.length > 0 &&
							<table className = 'table'>
								<thead>
									<tr>
										<th scope='col'>Edificio</th>
										<th scope='col'>Nombre</th>
										<th scope='col'>Descripción</th>
										<th scope='col'>Precio</th>
										<th scope='col'>En uso</th>
										<th scope='col'></th>
									</tr>
								</thead>
								<tbody>
									{ this.props.oficinasVirtuales.map(ov =>
									<tr key = {ov.id}>
										<th>{ov.edificio.nombre}</th>
										<th>{ov.nombre}</th>
										<th>{ov.descripcion}</th>
										<th>{ov.precio}</th>
										<th>{ov.en_uso}</th>
										<th>
											<div className = 'btn-group' role = 'group' aria-label='button-group'>
												<a className = 'btn btn-primary btn-sm' data-toggle = 'tooltip' data-placement = 'top' title = 'Ver oficina'>
													<FontAwesomeIcon icon = { faEye } />
												</a>
												<a className = 'btn btn-info btn-sm' data-toggle = 'tooltip' data-placement = 'top' title = 'Habilitar o deshabilitar disponibilidad'>
													<FontAwesomeIcon icon = { faDoorOpen } />
												</a>
												<button type = 'button' className = 'btn btn-danger btn-sm' data-toggle = 'tooltip' data-placement = 'top' title = 'Eliminar oficina'>
													<FontAwesomeIcon icon = { faTrash } />
												</button>
											</div>
										</th>
									</tr>
									) }
								</tbody>
							</table>
							}
						</React.Fragment>
						}
					</div>
				</section>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	oficinasVirtualesStatus: state.oficinasVirtualesData.status.oficinasVirtuales,
	oficinasVirtuales: state.oficinasVirtualesData.oficinasVirtuales,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(OficinasVirtuales);
