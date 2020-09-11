import React from "react";
import {
	HashRouter,
	Route,
} from "react-router-dom";

import PreAuth from '../pages/PreAuth';
import Login from '../pages/Login';
import Inicio from '../pages/Inicio';
import EdificioInicio from '../pages/Edificios';
import EdificioCreate from '../pages/Edificios/EdificioCreate'
import EdificioUpdate from '../pages/Edificios/EdificioUpdate'
import Oficinas from '../pages/Oficinas';
import OficinasCreate from '../pages/Oficinas/OficinaCreate';

const MainRoute = () => (
	<HashRouter>
		<div>
			<Route path = '/' exact component = { PreAuth } />
			<Route path = '/login' exact component = { Login } />
			<Route path = '/inicio' exact component = { Inicio } />
			<Route path = '/edificios' exact component = { EdificioInicio } />
			<Route path = '/edificios/create' exact component = { EdificioCreate }/>
			<Route path = '/edificios/update' exact component = { EdificioUpdate } />
			<Route path = '/oficinas' exact component = {Oficinas} />
			<Route path = '/oficinas/create' exact component = { OficinasCreate } />
		</div>
	</HashRouter>
)

export default MainRoute;
