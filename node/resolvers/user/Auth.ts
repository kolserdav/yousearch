import * as orm from '../../orm';
import * as Types from '../../../next-env';
import * as srv from '../../../services';
import * as lib from '../../lib';

/**
 * Auth user query route
 * @param _parent 
 * @param params {void}
 * @param context 
 */
const Auth: Types.RequestHandler<void, Types.Schema.Values.Auth> = async (_parent, params, context) => {
  const { headers } = context;
  const { lang, _qt } = headers;
  const t = srv.getLang(lang);
  const guestRes: Types.Schema.Values.Auth = {
    result: 'success',
    message: 'auth',
    role: 'guest',
  };
  if (!_qt) {
    return guestRes;
  }
  const parsedToken = lib.parseToken(_qt);
  if (parsedToken === null) {
    return guestRes;
  }
  const { id } = parsedToken;
  const user = await orm.user.getById(id);
  if (user.error) {
    return {
      result: 'error',
      message: t.server.user.errorGetByEmail,
    };
  }
  const { data } = user;
  if (!data) {
    return guestRes;
  }
  if (data.password !== parsedToken.password) {
    return guestRes;
  }
  if (parsedToken.userAgent !== headers['user-agent']) {
    return guestRes;
  }
  return {
    result: 'success',
    message: 'auth',
    role: 'user',
  };
};

export default Auth;
