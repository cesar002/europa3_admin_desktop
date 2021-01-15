import React from 'react';
import { connect } from 'react-redux'
import swal from 'sweetalert2';

import Europa3Api from '../../api';

import Container from '../../components/pures/ContainerMaster';
import CreateOficinaForm from '../../components/forms/oficinaVirtual';

import { startFetchOficinasVirtuales } from '../../redux/actions/oficinasVirtualesActions'

class OficinaVirtualCreate extends React.Component{
	constructor(props){
		super(props);

		this.registerOficina = this.registerOficina.bind(this);
	}

	async registerOficina(values, setSubmitting, resetForm){

		try {

			const resp = await Europa3Api.registerOficinaVirtual(values)
			if(resp.status !== 'success')
				throw resp.data;

			this.props.fetchOficinasVirtuales();

			resetForm();
			swal.fire({
				icon: 'success',
				title: 'Correcto',
				text: resp.data.message,
			})
		} catch (error) {
			swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'ocurrió un error al registrar la oficina virtual',
			})
		}finally{
			setSubmitting(false);
		}

	}

	render(){
		return(
			<Container
				title = 'Registrar oficina virtual'
				toBack = '/oficinas-virtuales'
			>
				<div className = 'row mt-4 px-5'>
					<div className = 'col col-sm-6'>
						<CreateOficinaForm
							submit = { this.registerOficina }
							edificios = { this.props.edificios }
							initialValues = {{
								edificio_id: 0,
								nombre: '',
								descripcion: '',
								precio: 0,
								servicios: [],
							}}
						/>
					</div>
				</div>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	edificios: state.edificiosData.edificios,
})

const mapDispatchToProps = dispatch => ({
	fetchOficinasVirtuales(){
		dispatch(startFetchOficinasVirtuales())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(OficinaVirtualCreate);
