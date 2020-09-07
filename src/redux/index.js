import { createStore, applyMiddleware } from 'redux';
import reduxSaga from 'redux-saga';

import mainSagas from './sagas';
import state from './state';

const sagas = reduxSaga();

const store = createStore(
	state,
	applyMiddleware(sagas)
)

sagas.run(mainSagas);

export default store;
