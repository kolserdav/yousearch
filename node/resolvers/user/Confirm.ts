import * as orm from '../../orm';
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
const Confirm: RequestHandler<Schema.Params.Confirm, Schema.Values.Response> = async (
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
  return {
    result: 'success',
    message: t.server.user.successEmailConfirmed,
  };
};

export default Confirm;
