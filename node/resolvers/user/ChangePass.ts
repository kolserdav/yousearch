import * as orm from '../../orm';
import * as srv from '../../../services';
import * as lib from '../../lib';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
const { MIN_PASSWORD_LENGTH, LINK_EXPIRE } = serverRuntimeConfig;

/**
 * Change password
 * @param _parent
 * @param params
 * @param context
 */
const ChangePass: RequestHandler<Schema.Params.ChangePass, Schema.Values.Response> = async (
  _parent,
  params,
  context
) => {
  const { headers } = context;
  const { lang } = headers;
  const t = srv.getLang(lang);
  const { input } = params;
  if (!input) {
    return {
      result: 'warning',
      message: t.server.user.warningInputParamsNotSend,
    };
  }
  if (!input.key) {
    return {
      result: 'warning',
      message: t.server.user.warningKeyNotSend,
    };
  }
  if (!input.password) {
    return {
      result: 'warning',
      message: t.server.user.warningPasswordNotSend,
    };
  }
  if (!input.passwordRepeat) {
    return {
      result: 'warning',
      message: t.server.user.warningPasswordRepeatNotSend,
    };
  }
  if (input.password !== input.passwordRepeat) {
    return {
      result: 'warning',
      message: t.server.user.warningPasswordsNotMatch,
    };
  }
  if (input.password.length < MIN_PASSWORD_LENGTH) {
    return {
      result: 'warning',
      message: `${t.server.user.warningPasswordTooShort} ${t.server.user.infoMinimumPasswordLength} ${MIN_PASSWORD_LENGTH}`,
    };
  }
  if (!input.email) {
    return {
      result: 'warning',
      message: t.server.user.warningEmailNotSend,
    };
  }
  if (!srv.validateEmail(input.email)) {
    return {
      result: 'warning',
      message: t.server.user.warningEmailNotValid,
    };
  }
  return {
    result: 'success',
    message: t.server.user.successPasswordUpdated,
  };
};

export default ChangePass;
