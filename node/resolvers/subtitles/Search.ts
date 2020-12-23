import * as Types from '../../../next-env';
import * as orm from '../../orm';
import * as lib from '../../lib';
import * as srv from '../../../services';
import { getSubtitles } from 'youtube-captions-scraper';

/**
 * Search subtitles route
 * @param _parent parent route
 * @param params {Types.Schema.Params.Subtitles} request params
 * @param context context (headers)
 */
const Search: Types.RequestHandler<Types.Schema.Params.Subtitles, Types.Schema.Values.Subtitles> = async (
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
  const { videoID, search } = input;
  if (!videoID) {
    return {
      result: 'warning',
      message: t.server.subtitles.warningVideoIDNotSend,
    };
  }
  if (!search) {
    return {
      result: 'warning',
      message: t.server.subtitles.warningSearchStringNotSend,
    };
  }
  const items = await new Promise<Types.Schema.Values.SubtitlesItem[]>((resolve) => {
    getSubtitles({
      videoID,
      lang: 'ru',
    }).then((captions) => {
      resolve(captions);
    });
  });
  console.log(items)
  return {
    result: 'success',
    message: t.server.subtitles.successReceived,
    items: [{start: 'sd', text: 'ds'}],
  };
};

export default Search;