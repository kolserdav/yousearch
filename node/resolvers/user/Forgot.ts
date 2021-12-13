import * as orm from '../../orm';
import * as srv from '../../../services';
import * as utils from '../../utils';

/**
 * Send forgot email
 * @param _parent
 * @param params {void}
 * @param context
 */
const Forgot: RequestHandler<Schema.Params.Forgot, Schema.Values.Response> = async (
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
  return {
    result: 'success',
    message: t.server.user.successForgotEmailIsSend,
  };
};

export default Forgot;
