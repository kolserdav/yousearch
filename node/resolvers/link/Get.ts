import * as orm from '../../orm';
import * as Types from '../../../next-env';
import * as srv from '../../../services';

/**
 * Get link
 * @param _parent
 * @param params {void}
 * @param context
 */
const GetLink: Types.RequestHandler<Types.Schema.Params.ID, Types.Schema.Values.Link> = async (
  _parent,
  params,
  context
) => {
  const { headers } = context;
  const { lang } = headers;
  const t = srv.getLang(lang);
  const getRes = await orm.link.getById(params.input.id);
  if (getRes.error) {
    console.warn(headers);
    return {
      result: 'error',
      message: t.server.link.errorGettingLink,
    };
  }
  if (!getRes.data) {
    return {
      result: 'warning',
      message: t.server.link.warningLinkNotFound,
    };
  }
  return {
    result: 'success',
    message: 'link received',
    link: 'link',
    description: 'ds'
  };
};

export default GetLink;
