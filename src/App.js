import React from 'react'
import { Provider } from 'react-redux'

import Router from './routes/main'
import store from './redux'

import ChatRecepcion from './components/containers/ChatRecepcionModal';

export default class App extends React.Component{
	render(){
		return(
			<Provider store = { store }>
				<Router />
				<ChatRecepcion />
			</Provider>
		)
	}
}
