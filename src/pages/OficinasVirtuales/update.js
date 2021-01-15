import React from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenAlt } from '@fortawesome/free-solid-svg-icons';

import Europa3Api from '../../api';

import Container from '../../components/pures/ContainerMaster';
import UpdateOficinaForm from '../../components/forms/oficinaVirtual';

import { clearOficinaVirtualSelected, startFetchOficinasVirtuales } from '../../redux/actions/oficinasVirtualesActions'

class OficinaVirtualUpdate extends React.Component{
	constructor(props){
		super(props);

		this.toggleEdit = this.toggleEdit.bind(this)
		this.updateData = this.updateData.bind(this)

		this.state = {
			isEdit: false,
		}
	}

	componentWillUnmount(){
		this.props.clearSelected()
	}

	toggleEdit(){
		let up = this.state.isEdit;
		this.setState({
			isEdit: !up,
		})
	}

	async updateData(values, setSubmitting, resetForm){
		try {
			const resp = await Europa3Api.updateOficinaVirtual(this.props.oficinaSelected.id, values);
			if(resp.status !== 'success')
				throw resp.data;

			this.props.fetchOficinasVirtuales();

			swal.fire({
				icon: 'success',
				title: 'Correcto',
				text: resp.data.message,
			})
		} catch (error) {
			swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'ocurrió un error al actualizar la oficina virtual',
			})
		}finally{
			setSubmitting(false)
		}
	}

	render(){
		return(
			<Container
				title = 'Editar Oficina'
				toBack = '/oficinas-virtuales'
				elementHeader = {
					<div className = {`btn btn-primary ${ this.state.isEdit ? 'active' : '' }`}
						onClick = { this.toggleEdit }
					>
						<FontAwesomeIcon icon = {faPenAlt} />
					</div>
				}
			>
				<div className = 'row mt-4 px-5'>
					<div className = 'col col-sm-6'>
						<UpdateOficinaForm
							edificios = { this.props.edificios }
							initialValues = {{
								nombre: this.props.oficinaSelected.nombre,
								descripcion: this.props.oficinaSelected.descripcion ? this.props.oficinaSelected.descripcion : '',
								precio: this.props.oficinaSelected.precio,
								servicios: this.props.oficinaSelected.servicios,
								edificio_id: this.props.oficinaSelected.edificio_id,
							}}
							isDisable = { !this.state.isEdit }
							submit = { this.updateData }
						/>
					</div>
				</div>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	oficinaSelected: state.oficinasVirtualesData.oficinaSelected,
	edificios: state.edificiosData.edificios,
})

const mapDispatchToProps = dispatch => ({
	clearSelected(){
		dispatch(clearOficinaVirtualSelected())
	},
	fetchOficinasVirtuales(){
		dispatch( startFetchOficinasVirtuales() )
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(OficinaVirtualUpdate)
