import * as Types from '../../../next-env';
import * as orm from '../../orm';
import * as srv from '../../../services'; 

/**
 * Registion route
 * @param parent parent route
 * @param params request params
 * @param context context (headers)
 */
const Registration: Types.RequestHandler<
  Types.Schema.Params.Registration,
  Types.Schema.Values.Registration
> = async (parent, params, context) => {
  const { headers } = context;
  const { lang } = headers;
  const t = srv.getLang(lang);
  // Check if user exists
  const user = await orm.user.getByEmail(params);
  if (user.error) {
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
  // Add new user
  const newUser = await orm.user.createNew(params);
  if (newUser.error) {
    return {
      result: 'error',
      message: t.server.user.errorRegistration,
    };
  }
  return {
    result: 'success',
    message: t.server.user.successRegistration,
    token: params.input.email,
  };
}

export default Registration;