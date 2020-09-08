import React from "react";
import {
	HashRouter,
	Route,
} from "react-router-dom";

import PreAuth from '../pages/PreAuth'
import Login from '../pages/Login'
import DashBoard from '../pages/Dashboard'

const MainRoute = () => (
	<HashRouter>
		<div>
			<Route path = '/' exact component = { PreAuth } />
			<Route path = '/login' exact component = { Login } />
			<Route path = '/dashboard' component = { DashBoard } />
		</div>
	</HashRouter>
)

export default MainRoute;
