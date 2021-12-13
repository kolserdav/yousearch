import * as orm from '../../orm';
import * as srv from '../../../services';
import Auth from './Auth';

/**
 * Registion route
 * @param _parent parent route
 * @param params {Schema.Params.Login} request params
 * @param context context (headers)
 */
const Login: RequestHandler<Schema.Params.Visit, Schema.Values.Response> = async (
  _parent,
  params,
  context
) => {
  const { headers } = context;
  const { lang } = headers;
  const t = srv.getLang(lang);
  const ip = headers['x-forwarded-for'];
  const user_agent = headers['user-agent'];
  // Check params
  const { input } = params;
  if (!input) {
    return {
      result: 'warning',
      message: t.server.user.warningInputParamsNotSend,
    };
  }
  return {
    result: 'success',
    message: '',
  };
};

export default Login;
