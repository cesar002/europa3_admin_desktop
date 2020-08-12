import React from "react";
import {
	HashRouter,
	Route,
} from "react-router-dom";

import Login from '../pages/Login'

const MainRoute = () => (
	<HashRouter>
		<React.Fragment>
			<Route path = '/' exact component = { Login } />
			{/* <Route path = '/dashboard' component = { DashBoard } /> */}
		</React.Fragment>
	</HashRouter>
)

export default MainRoute;
