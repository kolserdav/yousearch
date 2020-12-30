import * as orm from '../../orm';
import * as Types from '../../../next-env';
import * as srv from '../../../services';
import * as lib from '../../lib';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
const { LINK_EXPIRE } = serverRuntimeConfig;

/**
 * Confirm email
 * @param _parent
 * @param params {void}
 * @param context
 */
const Confirm: Types.RequestHandler<
  Types.Schema.Params.Confirm,
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
  if (!input.email) {
    return {
      result: 'warning',
      message: t.server.user.warningEmailNotSend,
    };
  }
  if (!input.key) {
    return {
      result: 'warning',
      message: t.server.user.warningKeyNotSend,
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
  if (user.data.confirm) {
    return {
      result: 'warning',
      message: t.server.user.warningEmailConfirmedEarlier,
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
  const updateRes = await orm.user.updateUser({
    id: user.data.id,
    updated: new Date().toISOString(),
  });
  if (updateRes.error) {
    console.warn(headers);
    return {
      result: 'error',
      message: t.server.user.errorConfirmedEmail,
    };
  }
  return {
    result: 'success',
    message: t.server.user.successEmailConfirmed,
  };
};

export default Confirm;
