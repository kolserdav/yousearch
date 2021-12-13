import * as orm from '../../orm';
import * as srv from '../../../services';
import * as lib from '../../lib';

/**
 * Create new link
 * @param _parent
 * @param params {void}
 * @param context
 */
const Create: RequestHandler<Schema.Params.Link, Schema.Values.Link> = async (
  _parent,
  params,
  context
) => {
  const { headers } = context;
  const { lang, xqt } = headers;
  const t = srv.getLang(lang);
  const parsedToken = lib.parseToken(xqt);
  return {
    result: 'success',
    message: t.server.link.successCreated,
    link: '',
  };
};

export default Create;
