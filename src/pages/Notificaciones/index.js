import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import NotificationCardItem from '../../components/pures/NotificationCardItem';
import Container from '../../components/pures/ContainerMaster';
import EmptyScreen from '../../components/pures/EmptyScreen';

import * as userData from '../../redux/actions/userActions'


class Notificaciones extends React.Component{

	constructor(props){
		super(props)

		this.renderNotificacionesItems = this.renderNotificacionesItems.bind(this);
		this.deleteNotification = this.deleteNotification.bind(this);
	}

	deleteNotification(idNotification){
		this.props.fetchDeleteNotification(idNotification)
	}

	renderNotificacionesItems(){
		if(this.props.notificaciones.length > 0){
			return this.props.notificaciones.map(not =>
				<NotificationCardItem key = { not.id }
					idNotification = { not.id }
					fetching = { not.status.startFetch }
					handleDelete = { this.deleteNotification }
					texto = { not.data.body }
					date = { not.created_at }
					typeId = { not.data.type }
				/>
			)
		}
	}

	render(){
		return(
			<Container title = 'Notificaciones'>
				<section className = 'mt-5 px-2 d-flex justify-content-center'>
					<div className = 'container'>
						{ this.renderNotificacionesItems() }
						{ this.props.notificaciones.length == 0 &&
						<EmptyScreen text = 'No hay notificaciones' />
						}
					</div>
				</section>
			</Container>
		);
	}

}

const mapStateToProps = state => ({
	notificaciones: state.userData.notificaciones.solicitudes,
})

const mapDispatchToProps = dispatch => ({
	fetchDeleteNotification(id){
		dispatch(userData.startFetchDeleteNotification(id));
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(Notificaciones);
