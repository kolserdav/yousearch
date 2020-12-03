import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as Types from '../../next-env';
import reducer from './reducers';
import * as sagas from '../../pages/store/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas.mySaga);
sagaMiddleware.run(sagas.registrationSaga);

const action = (
  actionParams: Types.Action<Types.Schema.Params.All>
): Types.Action<Types.Schema.Params.All> => store.dispatch(actionParams);

export { store, action };
