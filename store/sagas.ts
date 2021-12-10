import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as Api from './Api';

/**
 * Registration user
 * @param action
 */
function* registration(action: Action<Schema.Params.Registration>) {
  const body = yield call(Api.registration, action);
  yield put<Action<Schema.Values.RegistrationRequest>>({
    type: 'REGISTRATION',
    body,
  });
}
export function* registrationSaga(): Generator {
  yield takeEvery<Registration>('REGISTRATION_REQUEST', registration);
}

/**
 * Login user
 */
function* login(action: Action<Schema.Params.Login>) {
  const body = yield call(Api.login, action);
  yield put<Action<Schema.Values.LoginRequest>>({
    type: 'LOGIN',
    body,
  });
}
export function* loginSaga(): Generator {
  yield takeEvery<Login>('LOGIN_REQUEST', login);
}

/**
 * Search subtitles
 */
function* subtitles(action: Action<Schema.Params.Subtitles>) {
  const body = yield call(Api.subtitles, action);
  yield put<Action<Schema.Values.SubtitlesRequest>>({
    type: 'SUBTITLES',
    body,
  });
}
export function* subtitlesSaga(): Generator {
  yield takeEvery<Subtitles>('SUBTITLES_REQUEST', subtitles);
}

/**
 * Search subtitles
 */
function* captions(action: Action<Schema.Params.Captions>) {
  const body = yield call(Api.captions, action);
  yield put<Action<Schema.Values.Captions>>({
    type: 'CAPTIONS',
    body,
  });
}
export function* captionsSaga(): Generator {
  yield takeEvery<Captions>('CAPTIONS_REQUEST', captions);
}

/**
 * Get video info saga
 */
function* info(action: Action<Schema.Params.Captions>) {
  const body = yield call(Api.info, action);
  yield put<Action<Schema.Values.InfoRequest>>({
    type: 'INFO',
    body,
  });
}
export function* infoSaga(): Generator {
  yield takeEvery<Info>('INFO_REQUEST', info);
}

/**
 * Auth user
 */
function* auth(action: Action<void>) {
  const body = yield call(Api.auth, action);
  yield put<Action<Schema.Values.AuthRequest>>({
    type: 'AUTH',
    body,
  });
}
export function* authSaga(): Generator {
  yield takeEvery<Auth>('AUTH_REQUEST', auth);
}

/**
 * Create link
 */
function* link(action: Action<void>) {
  const body = yield call(Api.link, action);
  yield put<Action<Schema.Values.LinkRequest>>({
    type: 'LINK',
    body,
  });
}
export function* linkSaga(): Generator {
  yield takeEvery<Link>('LINK_REQUEST', link);
}

/**
 * Get link
 */
function* getLink(action: Action<Schema.Params.ID>) {
  const body = yield call(Api.getLink, action);
  yield put<Action<Schema.Values.LinkRequest>>({
    type: 'GET_LINK',
    body,
  });
}
export function* getLinkSaga(): Generator {
  yield takeEvery<GetLink>('GET_LINK_REQUEST', getLink);
}

/**
 * Confirm user
 */
function* confirm(action: Action<Schema.Params.Confirm>) {
  const body = yield call(Api.confirm, action);
  yield put<Action<Schema.Values.ConfirmRequest>>({
    type: 'CONFIRM',
    body,
  });
}
export function* confirmSaga(): Generator {
  yield takeEvery<Confirm>('CONFIRM_REQUEST', confirm);
}

/**
 * Get forgot email
 */
function* forgot(action: Action<Schema.Params.Forgot>) {
  const body = yield call(Api.forgot, action);
  yield put<Action<Schema.Values.ForgotRequest>>({
    type: 'FORGOT',
    body,
  });
}
export function* forgotSaga(): Generator {
  yield takeEvery<Forgot>('FORGOT_REQUEST', forgot);
}

/**
 * Change user password
 */
function* changePass(action: Action<Schema.Params.ChangePass>) {
  const body = yield call(Api.changePass, action);
  yield put<Action<Schema.Values.ChangePassRequest>>({
    type: 'CHANGE_PASS',
    body,
  });
}
export function* changePassSaga(): Generator {
  yield takeEvery<ChangePass>('CHANGE_PASS_REQUEST', changePass);
}

/**
 * Send confirm email
 */
function* sendConfirm(action: Action<Schema.Params.Forgot>) {
  const body = yield call(Api.sendConfirm, action);
  yield put<Action<Schema.Values.SendConfirmRequest>>({
    type: 'SEND_CONFIRM',
    body,
  });
}
export function* sendConfirmSaga(): Generator {
  yield takeEvery<SendConfirm>('SEND_CONFIRM_REQUEST', sendConfirm);
}

/**
 * Save visit
 */
function* visit(action: Action<Schema.Params.Visit>) {
  const body = yield call(Api.visit, action);
  yield put<Action<Schema.Values.VisitRequest>>({
    type: 'VISIT_CONFIRM',
    body,
  });
}
export function* visitSaga(): Generator {
  yield takeEvery<Visit>('VISIT_REQUEST', visit);
}
