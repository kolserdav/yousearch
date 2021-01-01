import * as orm from '../../orm';
import * as Types from '../../../next-env';
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
const ChangePass: Types.RequestHandler<
  Types.Schema.Params.ChangePass,
  Types.Schema.Values.Response
> = async (_parent, params, context) => {
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
  const user = await orm.user.getByEmail(input.email);
  if (user.error) {
    console.log(headers);
    return {
      result: 'error',
      message: t.server.user.errorGetByEmail,
    };
  }
  if (!user.data) {
    return {
      result: 'warning',
      message: t.server.user.warningUserNotFound,
    };
  }
  const dateStr = user.data.updated.toString();
  if (input.key !== lib.encodeBase64(dateStr)) {
    return {
      result: 'warning',
      message: t.server.user.warningKeyNotSend,
    };
  }
  const date = new Date(dateStr);
  // @ts-ignore
  if ((new Date() - date) / 1000 / 3600 / 24 > LINK_EXPIRE) {
    return {
      result: 'warning',
      message: t.server.user.warningKeyExpired,
    };
  }
  const updatePassRes = await orm.user.updatePassword({
    id: user.data.id,
    password: input.password,
    updated: new Date().toISOString(),
  });
  if (updatePassRes.error) {
    return {
      result: 'warning',
      message: t.server.user.errorUpdatePassword,
    };
  }
  return {
    result: 'success',
    message: t.server.user.successPasswordUpdated,
  };
};

export default ChangePass;
