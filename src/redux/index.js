import { createStore, applyMiddleware, compose } from 'redux';
import reduxSaga from 'redux-saga';

import mainSagas from './sagas';
import state from './state';

const sagas = reduxSaga();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	state,
	composeEnhancers(
		applyMiddleware(sagas)
));

sagas.run(mainSagas);

export default store;
