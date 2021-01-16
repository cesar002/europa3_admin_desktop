import React from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenAlt } from '@fortawesome/free-solid-svg-icons';

import AdicionalForm from '../../components/forms/adicionales';
import Container from '../../components/pures/ContainerMaster';

import { startFetchAdicionales } from '../../redux/actions/adicionalesActions'

import Europa3Api from '../../api';

class AdicionalesUpdate extends React.Component{
	constructor(props){
		super(props);

		this.updateAdicional = this.updateAdicional.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this)

		this.state = {
			isEdit: false,
		}
	}

	async updateAdicional(values, setSubmitting, resetForm){
		try {
			const resp = await Europa3Api.updateAdicional(values, this.props.adicionalSelected.id);
			if(resp.status !== 'success'){
				throw resp.data;
			}

			this.props.fetchAdicionales();

			swal.fire({
				icon: 'success',
				title: 'correcto',
				text: resp.data.message,
			})
		} catch (error) {
			swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Ocurrió un error al actualizar el adicional'
			})
		}finally{
			setSubmitting(false);
		}
	}

	toggleEdit(){
		const edit = this.state.isEdit
		this.setState({
			isEdit: !edit,
		})
	}

	render(){
		return(
			<Container
				title = 'Actualizar Adicional'
				toBack = '/adicionales'
				elementHeader = {
					<div className = {`btn btn-primary ${ this.state.isEdit ? 'active' : '' }`}
						onClick = { this.toggleEdit }
					>
						<FontAwesomeIcon icon = {faPenAlt} />
					</div>
				}
			>
				<div className = 'row mt-3'>
					<div className = 'col-sm-3'/>
					<div className = 'col col-sm-6'>
						<AdicionalForm
							isDisable = { !this.state.isEdit }
							edificios = { this.props.edificios }
							unidades = { this.props.unidades }
							initialValues = {{
								edificio_id: this.props.adicionalSelected.edificio_id,
								unidad_id: this.props.adicionalSelected.unidad_id,
								cantidad_maxima: this.props.adicionalSelected.cantidad_maxima,
								descripcion: this.props.adicionalSelected.descripcion ? this.props.adicionalSelected.descripcion : '',
								nombre: this.props.adicionalSelected.nombre,
								unidad_base: this.props.adicionalSelected.unidad_base,
								precio: this.props.adicionalSelected.precio,
							}}
							submit = { this.updateAdicional }
						/>
					</div>
					<div className = 'col-sm-3'/>
				</div>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	unidades: state.adicionalesData.unidades,
	edificios: state.edificiosData.edificios,
	adicionalSelected: state.adicionalesData.adicionalSelected,
})

const mapDispatchToProps = dispatch => ({
	fetchAdicionales(){
		dispatch(startFetchAdicionales())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(AdicionalesUpdate);
