import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import accouting from 'accounting-js'
import swal from 'sweetalert2';

import Europa3Api from '../../api';

import Container from '../../components/pures/ContainerMaster';
import LoadingScreen from '../../components/pures/LoadingScreen';
import EmptyScreen from '../../components/pures/EmptyScreen';

import * as adicionalesActions from '../../redux/actions/adicionalesActions';
import Swal from 'sweetalert2';

class Adicionales extends React.Component{
	constructor(props){
		super(props);

		this.showAdicional = this.showAdicional.bind(this);
		this.deleteAdicional = this.deleteAdicional.bind(this);
	}

	showAdicional(id){
		this.props.selectAdicional(id)

		this.props.history.push('/adicional/update');
	}

	deleteAdicional(id){
		swal.fire({
			title: '¿Está seguro que desea eliminar el adicional?',
			showCancelButton: true,
			cancelButtonText: 'No',
			confirmButttonText: 'Si'
		}).then(async result => {
			if(!result.isConfirmed){
				return;
			}

			try {
				const resp = await Europa3Api.deleteAdicional(id);
				if(resp.status !== 'success'){
					throw resp.data
				}

				this.props.fetchAdicionales();
				Swal.fire('Correcto', resp.data.message, 'success');
			} catch (error) {
				Swal.fire('Error', 'Ocurrió un error al intentar eliminar el adicional', 'error');
			}

		})
	}

	render(){
		return(
			<Container
				title = 'Adicionales'
			>
				<section className = 'mt-4 px-4'>
					<div className = 'row'>
						<div className = 'form-inline'>
							<div className = 'form-group'>
								<Link className = 'btn btn-primary btn-sm' to = '/adicional/create'>
									<FontAwesomeIcon icon = { faPlusCircle } className = 'mr-2'  />
									Registrar adicional
								</Link>
							</div>
						</div>
					</div>
					<div className = 'row mt-4'>
						{ this.props.adicionalesStatus.start && <LoadingScreen text = 'Cargando adicionales...' /> }
						{ this.props.adicionales.length == 0 && <EmptyScreen text = 'No hay adicionales registrados' mt = { 10 } /> }
						{ this.props.adicionales.length !== 0 && this.props.adicionalesStatus.finish &&
						<table className = 'table'>
							<thead>
								<tr>
									<th scope = 'col'>Nombre</th>
									<th scope = 'col'>Descripción</th>
									<th scope = 'col'>Cantidad máxima para comprar</th>
									<th scope = 'col'>Precio</th>
									<th scope = 'col'>Disponible</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{ this.props.adicionales.map(ad =>
								<tr key = { ad.id }>
									<th>{ad.nombre}</th>
									<th>{ad.descripcion}</th>
									<th>{ad.cantidad_maxima}</th>
									<th>{ accouting.formatMoney(ad.precio) }</th>
									<th>{ ad.disponible ? 'Si' : 'No' }</th>
									<th>
										<div className = 'btn-group' role = 'group' aria-label="Opciones">
											<button className = 'btn btn-primary btn-sm' onClick = {()=>this.showAdicional(ad.id)}>
												<FontAwesomeIcon icon = { faEye } />
											</button>
											<button type = 'button' className ='btn btn-danger btn-sm' onClick = {()=>this.deleteAdicional(ad.id)}>
												<FontAwesomeIcon icon = { faTrashAlt } />
											</button>
										</div>
									</th>
								</tr>
								) }
							</tbody>
						</table>
						}
					</div>
				</section>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	adicionales: state.adicionalesData.adicionales,
	adicionalesStatus: state.adicionalesData.status.adicionales,
})

const mapDispatchToProps = dispatch => ({
	selectAdicional(id){
		dispatch(adicionalesActions.selectAdicional(id));
	},
	fetchAdicionales(){
		dispatch(adicionalesActions.startFetchAdicionales());
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Adicionales))
