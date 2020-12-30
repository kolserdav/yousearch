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
  const { input } = params;
  if (!input) {
    return {
      result: 'warning',
      message: t.server.user.warningInputParamsNotSend,
    };
  }
  const getRes = await orm.link.getById(input.id);
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
  const { data } = getRes;
  return {
    result: 'success',
    message: t.server.link.successReceived,
    link: data.link,
    description: data.description,
  };
};

export default GetLink;
