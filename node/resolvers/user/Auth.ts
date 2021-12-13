import * as orm from '../../orm';
import * as srv from '../../../services';
import * as lib from '../../lib';

/**
 * Auth user query route
 * @param _parent
 * @param params {void}
 * @param context
 */
const Auth: RequestHandler<void, Schema.Values.Auth> = async (_parent, params, context) => {
  const { headers } = context;
  const { lang, xqt } = headers;
  const t = srv.getLang(lang);
  const guestRes: Schema.Values.Auth = {
    result: 'success',
    message: 'auth',
    role: 'guest',
  };
  if (!xqt) {
    return guestRes;
  }
  const parsedToken = lib.parseToken(xqt);
  if (parsedToken === null) {
    return guestRes;
  }
  const { id } = parsedToken;
  return {
    result: 'success',
    message: 'auth',
    role: 'user',
  };
};

export default Auth;
