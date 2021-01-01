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

/**
 * Get video info saga
 */
function* info(action: Types.Action<Types.Schema.Params.Captions>) {
  const body = yield call(Api.info, action);
  yield put<Types.Action<Types.Schema.Values.InfoRequest>>({
    type: 'INFO',
    body,
  });
}
export function* infoSaga(): Generator {
  yield takeEvery<Types.ActionTypes.Info>('INFO_REQUEST', info);
}

/**
 * Auth user
 */
function* auth(action: Types.Action<void>) {
  const body = yield call(Api.auth, action);
  yield put<Types.Action<Types.Schema.Values.AuthRequest>>({
    type: 'AUTH',
    body,
  });
}
export function* authSaga(): Generator {
  yield takeEvery<Types.ActionTypes.Auth>('AUTH_REQUEST', auth);
}

/**
 * Create link
 */
function* link(action: Types.Action<void>) {
  const body = yield call(Api.link, action);
  yield put<Types.Action<Types.Schema.Values.LinkRequest>>({
    type: 'LINK',
    body,
  });
}
export function* linkSaga(): Generator {
  yield takeEvery<Types.ActionTypes.Link>('LINK_REQUEST', link);
}

/**
 * Get link
 */
function* getLink(action: Types.Action<Types.Schema.Params.ID>) {
  const body = yield call(Api.getLink, action);
  yield put<Types.Action<Types.Schema.Values.LinkRequest>>({
    type: 'GET_LINK',
    body,
  });
}
export function* getLinkSaga(): Generator {
  yield takeEvery<Types.ActionTypes.GetLink>('GET_LINK_REQUEST', getLink);
}

/**
 * Confirm user
 */
function* confirm(action: Types.Action<Types.Schema.Params.Confirm>) {
  const body = yield call(Api.confirm, action);
  yield put<Types.Action<Types.Schema.Values.ConfirmRequest>>({
    type: 'CONFIRM',
    body,
  });
}
export function* confirmSaga(): Generator {
  yield takeEvery<Types.ActionTypes.Confirm>('CONFIRM_REQUEST', confirm);
}

/**
 * Get forgot email
 */
function* forgot(action: Types.Action<Types.Schema.Params.Forgot>) {
  const body = yield call(Api.forgot, action);
  yield put<Types.Action<Types.Schema.Values.ForgotRequest>>({
    type: 'FORGOT',
    body,
  });
}
export function* forgotSaga(): Generator {
  yield takeEvery<Types.ActionTypes.Forgot>('FORGOT_REQUEST', forgot);
}

/**
 * Change user password
 */
function* changePass(action: Types.Action<Types.Schema.Params.ChangePass>) {
  const body = yield call(Api.changePass, action);
  yield put<Types.Action<Types.Schema.Values.ChangePassRequest>>({
    type: 'CHANGE_PASS',
    body,
  });
}
export function* changePassSaga(): Generator {
  yield takeEvery<Types.ActionTypes.ChangePass>('CHANGE_PASS_REQUEST', changePass);
}
