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
  const newParams: Schema.Params.Link = Object.assign({}, params);
  newParams.input.userId = parsedToken.id;
  const createRes = await orm.link.createNew(newParams);
  if (createRes.error === 1) {
    return {
      result: 'error',
      message: t.server.link.errorCreate,
    };
  }
  const newLink = params.input.link + `&i=${createRes.data.id}`;
  return {
    result: 'success',
    message: t.server.link.successCreated,
    link: newLink,
  };
};

export default Create;
