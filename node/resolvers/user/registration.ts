import * as Types from '../../../next-env';
import * as orm from '../../orm';
import * as srv from '../../../services';
import * as lib from '../../lib';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
const { MIN_PASSWORD_LENGTH } = serverRuntimeConfig;

/**
 * Registion route
 * @param parent parent route
 * @param params {Types.Schema.Params.Registration} request params
 * @param context context (headers)
 */
const Registration: Types.RequestHandler<
  Types.Schema.Params.Registration,
  Types.Schema.Values.Registration
> = async (parent, params, context) => {
  const { headers } = context;
  const { lang } = headers;
  const t = srv.getLang(lang);
  // Check params
  const { input } = params;
  if (!input) {
    return {
      result: 'warning',
      message: t.server.user.warningInputParamsRegistrationNotSend,
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
  // Check if user exists
  const user = await orm.user.getByEmail(params.input.email);
  if (user.error) {
    console.warn(headers);
    return {
      result: 'error',
      message: t.server.user.errorGetByEmail,
    };
  }
  if (user.data !== undefined) {
    return {
      result: 'warning',
      message: t.server.user.warningAreRegistered,
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
  // Add new user
  const newUser = await orm.user.createNew(params);
  if (newUser.error) {
    console.warn(headers);
    return {
      result: 'error',
      message: t.server.user.errorRegistration,
    };
  }
  const addedUser = await orm.user.getByEmail(params.input.email);
  if (addedUser.error) {
    return {
      result: 'error',
      message: t.server.user.errorGetByEmail,
    };
  }
  if (addedUser.data === undefined) {
    return {
      result: 'warning',
      message: t.server.user.warningGetUserData,
    };
  }
  const token = lib.getParsedToken(user.data, headers)
  return {
    result: 'success',
    message: t.server.user.successRegistration,
    token,
  };
}

export default Registration;