import React from "react";
import {
	HashRouter,
	Route,
} from "react-router-dom";

import Login from '../pages/Login'
import DashBoard from '../pages/Dashboard'

const MainRoute = () => (
	<HashRouter>
		<div>
			<Route path = '/' exact component = { Login } />
			<Route path = '/dashboard' component = { DashBoard } />
		</div>
	</HashRouter>
)

export default MainRoute;
