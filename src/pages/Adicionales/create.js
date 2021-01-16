import React from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert2';

import AdicionalForm from '../../components/forms/adicionales';
import Container from '../../components/pures/ContainerMaster';

import { startFetchAdicionales } from '../../redux/actions/adicionalesActions'

import Europa3Api from '../../api';

class AdicionalesCreate extends React.Component{
	constructor(props){
		super(props)

		this.registerAdicional = this.registerAdicional.bind(this)

	}

	async registerAdicional( values, setSubmitting, resetForm ){
		try {
			const resp = await Europa3Api.registerAdicional(values);

			if(resp.status !== 'success'){
				throw resp.data;
			}

			swal.fire({
				icon: 'success',
				title: 'correcto',
				text: resp.data.message,
			})

			this.props.fetchAdicionales();

			resetForm();
		} catch (error) {
			swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Ocurrió un error al registrar el adicional'
			})
		}finally{
			setSubmitting(false);
		}
	}

	render(){
		return(
			<Container
				title = 'Registrar Adicional'
				toBack = '/adicionales'
			>
				<div className = 'row mt-3'>
					<div className = 'col-sm-3' />
					<div className = 'col col-sm-6'>
						<AdicionalForm
							edificios = { this.props.edificios }
							unidades = { this.props.unidades }
							submit = { this.registerAdicional }
							initialValues = {{
								edificio_id: 0,
								unidad_id: 0,
								cantidad_maxima: 0,
								descripcion: '',
								nombre: '',
								unidad_base: 0,
								precio: 0,
							}}
						/>
					</div>
					<div className = 'col-sm-3' />
				</div>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	unidades: state.adicionalesData.unidades,
	edificios: state.edificiosData.edificios,
})

const mapDispatchToProps = dispatch => ({
	fetchAdicionales(){
		dispatch(startFetchAdicionales());
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(AdicionalesCreate)
