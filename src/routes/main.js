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
import OficinasUpdate from '../pages/Oficinas/OficinaUpdate';
import Mobiliario from '../pages/Mobiliario';
import MobiliarioCreate from '../pages/Mobiliario/MobiliarioCreate';
import Servicios from '../pages/Servicios';
import IdiomasAtencion from '../pages/IdiomasAtencion';

const MainRoute = () => (
	<HashRouter>
		<React.Fragment>
			<Route path = '/' exact component = { PreAuth } />
			<Route path = '/login' exact component = { Login } />
			<Route path = '/inicio' exact component = { Inicio } />
			<Route path = '/edificios' exact component = { EdificioInicio } />
			<Route path = '/edificios/create' exact component = { EdificioCreate }/>
			<Route path = '/edificios/update' exact component = { EdificioUpdate } />
			<Route path = '/oficinas' exact component = {Oficinas} />
			<Route path = '/oficinas/create' exact component = { OficinasCreate } />
			<Route path = '/oficinas/update' exact component = { OficinasUpdate } />
			<Route path = '/mobiliario' exact component = { Mobiliario } />
			<Route path = '/mobiliario/create' exact component = { MobiliarioCreate } />
			<Route path = '/servicios' exact component = {Servicios}/>
			<Route path = '/idiomas-atencion'exact component = {IdiomasAtencion} />
		</React.Fragment>
	</HashRouter>
)

export default MainRoute;
