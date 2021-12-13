import * as orm from '../../orm';
import * as srv from '../../../services';
import * as lib from '../../lib';
import * as utils from '../../utils';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
const { MIN_PASSWORD_LENGTH } = serverRuntimeConfig;

/**
 * Registion route
 * @param parent parent route
 * @param params {Schema.Params.Registration} request params
 * @param context context (headers)
 */
const Registration: RequestHandler<Schema.Params.Registration, Schema.Values.Registration> = async (
  parent,
  params,
  context
) => {
  const { headers } = context;
  const { lang } = headers;
  const t = srv.getLang(lang);
  // Check params
  const { input } = params;
  if (!input) {
    return {
      result: 'warning',
      message: t.server.user.warningInputParamsNotSend,
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
  // Check passwords
  if (!input.password) {
    return {
      result: 'warning',
      message: t.server.user.warningPasswordNotSend,
    };
  }
  if (input.password.length < MIN_PASSWORD_LENGTH) {
    return {
      result: 'warning',
      message: `${t.server.user.warningPasswordTooShort} ${t.server.user.infoMinimumPasswordLength} ${MIN_PASSWORD_LENGTH}`,
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
  return {
    result: 'success',
    message: t.server.user.successRegistration,
    warning: t.server.email.send,
  };
};

export default Registration;
