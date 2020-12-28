/**
 * Saga middlewares
 */
import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as Types from '../../next-env';
import reducer from '../lib/reducers';
import * as sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store: Store<Types.Reducer<any>, Types.Action<any>> = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

/**
 * After create API and Saga do add middleware to store
 */
sagaMiddleware.run(sagas.registrationSaga);
sagaMiddleware.run(sagas.loginSaga);
sagaMiddleware.run(sagas.subtitlesSaga);
sagaMiddleware.run(sagas.captionsSaga);
sagaMiddleware.run(sagas.infoSaga);
sagaMiddleware.run(sagas.authSaga);

function action<T>(actionParams: Types.Action<T>): void {
  store.dispatch(actionParams);
}

/**
 * User store
 */
const userStore: Store<Types.Reducer<any>, Types.Action<any>> = createStore(reducer);

export { store, action, userStore };
