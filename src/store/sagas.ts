import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as Types from '../../next-env';
import * as Api from './Api';

function* fetchUser(action: Types.Action<Types.Schema.Params.User>) {
  const body = yield call(Api.fetchTest, action);
  yield put<Types.Action<Types.Schema.Values.User>>({
    type: 'USER_FETCH',
    body,
  });
}

function* registration(action: Types.Action<Types.Schema.Params.Registration>) {
  const body = yield call(Api.registration, action);
  yield put<Types.Action<Types.Schema.Values.RegistrationRequest>>({
    type: 'REGISTRATION',
    body,
  });
}

export function* mySaga(): Generator {
  yield takeEvery<Types.Action<Types.Schema.Params.User>>('USER_FETCH_REQUEST', fetchUser);
}

export function* registrationSaga(): Generator {
  yield takeEvery<Types.Action<Types.Schema.Params.Registration>>(
    'REGISTRATION_REQUEST',
    registration
  );
}
