import React from 'react';
import { withRouter } from 'react-router-dom';
import accouting from 'accounting-js'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faDoorOpen, faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import Container from '../../components/pures/ContainerMaster';
import Loading from '../../components/pures/LoadingSpinner';
import EmptyScreen from '../../components/pures/EmptyScreen';

import * as oficinasVirtualesActions from '../../redux/actions/oficinasVirtualesActions';

class OficinasVirtuales extends React.Component{
	constructor(props){
		super(props);

		this.selectOficinaVirtual = this.selectOficinaVirtual.bind(this)

	}

	selectOficinaVirtual(id){
		this.props.selectOficina(id);

		this.props.history.push('/oficina-virtual/update');
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
								<Link className = 'btn btn-primary btn-sm' to = '/oficinas-virtuales/create'>
									<FontAwesomeIcon icon = { faPlusCircle } className = 'mr-2' />
									Registrar oficina virtual
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
										<th>{accouting.formatMoney(ov.precio)}</th>
										<th>{ov.en_uso ? 'si' : 'no'}</th>
										<th>
											<div className = 'btn-group' role = 'group' aria-label='button-group'>
												<button type = 'button' className = 'btn btn-primary btn-sm' data-toggle = 'tooltip' data-placement = 'top' title = 'Ver oficina'
													onClick = {()=>this.selectOficinaVirtual(ov.id)}
												>
													<FontAwesomeIcon icon = { faEye } className = 'text-white' />
												</button>
												<Link className = 'btn btn-info btn-sm' data-toggle = 'tooltip' data-placement = 'top' title = 'Habilitar o deshabilitar disponibilidad'>
													<FontAwesomeIcon icon = { faDoorOpen } className = 'text-white' />
												</Link>
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
	selectOficina(id){
		dispatch(oficinasVirtualesActions.selectOficinaVirtual(id))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OficinasVirtuales));
