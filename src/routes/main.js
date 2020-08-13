import React from "react";
import {
	HashRouter,
	Route,
} from "react-router-dom";

import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'

const MainRoute = () => (
	<HashRouter>
		<React.Fragment>
			<Route path = '/' exact component = { Dashboard } />
			<Route path = '/dashboard' component = { Dashboard } />
		</React.Fragment>
	</HashRouter>
)

export default MainRoute;
