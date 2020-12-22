import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as Types from '../../next-env';
import * as Api from './Api';

/**
 * Registration user
 * @param action
 */
function* registration(action: Types.Action<Types.Schema.Params.Registration>) {
  const body = yield call(Api.registration, action);
  yield put<Types.Action<Types.Schema.Values.RegistrationRequest>>({
    type: 'REGISTRATION',
    body,
  });
}
export function* registrationSaga(): Generator {
  yield takeEvery<Types.Action<Types.Schema.Params.Registration>>(
    'REGISTRATION_REQUEST',
    registration
  );
}

/**
 * Login user
 */
function* login(action: Types.Action<Types.Schema.Params.Login>) {
  const body = yield call(Api.login, action);
  yield put<Types.Action<Types.Schema.Values.LoginRequest>>({
    type: 'LOGIN',
    body,
  });
}
export function* loginSaga(): Generator {
  yield takeEvery<Types.Action<Types.Schema.Params.Login>>('LOGIN_REQUEST', login);
}
