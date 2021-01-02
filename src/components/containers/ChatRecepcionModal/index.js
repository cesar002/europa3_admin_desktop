import React from 'react';
import { connect } from 'react-redux';


import ChatListItem from '../../pures/ChatListItem';
import RecivedMessage from '../../pures/RecivedMessageChat';
import SendingMessage from '../../pures/SendingMessageChat';

import * as chatActions from '../../../redux/actions/chatActions';

import UUIDGenerator from '../../../services/UUIDGenerator';


class ChatRecepcionModal extends React.Component{
	constructor(props){
		super(props);

		this.clickChat = this.clickChat.bind(this);
		this.renderChat = this.renderChat.bind(this);
		this.changeText = this.changeText.bind(this);
		this.sendMesage = this.sendMesage.bind(this);

		this.state = {
			textMessage: '',
			finderChat: null,
		}
	}

	clickChat(id){
		this.props.selectChat(id);
	}

	changeText(event){
		const text = event.target.value
		this.setState({
			textMessage: text,
		})
	}

	sendMesage(){
		const text = this.state.textMessage;
		const finder = this.state.finderChat;

		const data = {
			sender_by: 1,
			_id: UUIDGenerator.generate(),
			solicitud_id: finder.id,
			text,
			createdAt: new Date(),
		}

		this.props.addOwnMessage(data)
		this.setState({
			textMessage: '',
		})
		this.props.sendMessage(text, finder.body.edificio.id, finder.id);
	}

	componentDidUpdate(prevProps){
		if(this.props.chatSelectedId !== prevProps.chatSelectedId){
			const finder = this.props.chats.find(c => c.id == this.props.chatSelectedId)
			this.setState({
				finderChat: finder,
			})
		}
	}

	renderChat(){
		const finder = this.props.chats.find(c => c.id == this.props.chatSelectedId)

		return finder.chats.map(chat => {
			if(chat.sender_by === 2){
				return <RecivedMessage key = { chat._id } text = { chat.text } createdAt = {chat.createdAt} />
			}

			return <SendingMessage key = { chat._id } text = { chat.text } createdAt = {chat.createdAt} />
		})
	}

	render(){
		return(
			<div className = 'modal fade' id = 'chat-solicitudes' tabIndex = '-1' role = 'dialog' aria-labelledby = 'chat-solicitudes-label' aria-hidden = 'true'>
				<div className = 'modal-dialog modal-xl' role = 'document'>
					<div className = 'modal-content'>
						<div className = 'modal-header'>
							<h5 className = 'modal-title' id='chat-solicitudes-label'>
								Chat de recepción
							</h5>
							<button type = 'button' className = 'close' data-dismiss='modal' aria-label = 'close'>
								<span aria-hidden='true'>&times;</span>
							</button>
						</div>
						<div className = 'modal-body'>
							<div className = 'd-flex flex-row'>
								<div className = 'p-3 overflow-auto users_chat'>
									{ this.props.chats.map(chat =>
									<ChatListItem
										key = { chat.folio }
										id = { chat.id }
										img = { chat.body.img }
										activo = { !this.props.chatSelectedId ? false :
														this.props.chatSelectedId == chat.id
													}
										nombre = { chat.body.nombre }
										onClick = { this.clickChat }
										// ultimoMensaje = { this.props. }
									/>
									) }
								</div>
								<div className = 'p-3 messages_chat'>
									<div className = 'overflow-auto py-2 border-bottom' style = {{ height: '85%' }}>
										{ this.props.chatSelectedId && this.renderChat() }
									</div>
									<div className = 'pt-3 d-flex flex-row' style = {{ height: '15%' }}>
										<textarea className = 'form-control mr-4'
											value = {this.state.textMessage}
											onChange = { this.changeText }
										/>
										<button type = 'button' className = 'btn btn-primary btn-sm' onClick = {this.sendMesage} >
											Enviar
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	chats: state.chatsData.chats,
	chatSelectedId: state.chatsData.chatSelectedId,
})

const mapDispatchToProps = dispatch => ({
	selectChat(id){
		dispatch( chatActions.selectChat(id) );
	},
	sendMessage(mensaje, edificio_id, solicitud_id){
		dispatch(chatActions.sendMessageChat(mensaje, edificio_id, solicitud_id))
	},
	addOwnMessage(message){
		dispatch(chatActions.addSentMessageChat(message));
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatRecepcionModal);
