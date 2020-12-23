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
  yield takeEvery<Types.ActionTypes.Registration>('REGISTRATION_REQUEST', registration);
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
  yield takeEvery<Types.ActionTypes.Login>('LOGIN_REQUEST', login);
}

/**
 * Search subtitles
 */
function* subtitles(action: Types.Action<Types.Schema.Params.Subtitles>) {
  const body = yield call(Api.subtitles, action);
  yield put<Types.Action<Types.Schema.Values.SubtitlesRequest>>({
    type: 'SUBTITLES',
    body,
  });
}
export function* subtitlesSaga(): Generator {
  yield takeEvery<Types.ActionTypes.Subtitles>('SUBTITLES_REQUEST', subtitles);
}

/**
 * Search subtitles
 */
function* captions(action: Types.Action<Types.Schema.Params.Captions>) {
  const body = yield call(Api.captions, action);
  yield put<Types.Action<Types.Schema.Values.CaptionsRequest>>({
    type: 'CAPTIONS',
    body,
  });
}
export function* captionsSaga(): Generator {
  yield takeEvery<Types.ActionTypes.Captions>('CAPTIONS_REQUEST', captions);
}