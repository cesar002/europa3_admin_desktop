import React from "react";
import {
	HashRouter,
	Route,
} from "react-router-dom";

import Login from '../pages/Login'

const DashBoard = () => (
	<div>
		<h1>DASHBOARD</h1>
	</div>
)

const MainRoute = () => (
	<HashRouter>
		<div>
			<Route path = '/' exact component = { Login } />
			<Route path = '/dashboard' component = { DashBoard } />
		</div>
	</HashRouter>
)

export default MainRoute;
