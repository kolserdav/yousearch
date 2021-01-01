import * as orm from '../../orm';
import * as Types from '../../../next-env';
import * as srv from '../../../services';
import * as utils from '../../utils';

/**
 * Send forgot email
 * @param _parent
 * @param params {void}
 * @param context
 */
const Forgot: Types.RequestHandler<
  Types.Schema.Params.Forgot,
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
  const dateStr = new Date().toISOString();
  const updateRes = await orm.user.updateUser({
    id: user.data.id,
    updated: dateStr,
    confirm: user.data.confirm,
  });
  if (updateRes.error) {
    console.warn(headers);
    return {
      result: 'error',
      message: t.server.user.errorConfirmedEmail,
    };
  }
  const sendRes = await utils.sendForgotEmail(input.email, dateStr + user.data.password);
  if (sendRes.error) {
    return {
      result: 'warning',
      message: t.server.user.errorSendingForgotEmail,
    };
  }
  return {
    result: 'success',
    message: t.server.user.successForgotEmailIsSend,
  };
};

export default Forgot;
