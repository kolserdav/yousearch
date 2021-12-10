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
  // @ts-ignore
  const authRes = await Auth(_parent, {}, context, {});
  const saveRes = await orm.user.visit({
    input: {
      role: authRes.role,
      is_old: input.is_old,
      width: input.width,
      height: input.height,
      user_agent,
      ip,
      path: input.path,
      error: input.error,
    },
  });
  if (saveRes.error) {
    console.warn(headers);
  }
  return {
    result: 'success',
    message: '',
  };
};

export default Login;
