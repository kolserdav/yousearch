/**
 * Saga middlewares
 */
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as Types from '../../next-env';
import reducer from '../lib/reducers';
import * as sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

/**
 * After create API and Saga do add middleware to store
 */
sagaMiddleware.run(sagas.mySaga);
sagaMiddleware.run(sagas.registrationSaga);

const action = (actionParams: Types.Action<any>): Types.Action<any> => store.dispatch(actionParams);

export { store, action };
