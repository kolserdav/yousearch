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
const Search: Types.RequestHandler<
  Types.Schema.Params.Subtitles,
  Types.Schema.Values.Subtitles
> = async (_parent, params, context) => {
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
  const { videoID } = input;
  if (!videoID) {
    return {
      result: 'warning',
      message: t.server.subtitles.warningVideoIDNotSend,
    };
  }
  const items = await new Promise<Types.Schema.Values.SubtitlesItem[]>((resolve) => {
    getSubtitles({
      videoID,
      lang: input.lang,
    }).then((captions) => {
      resolve(captions);
    });
  });
  return {
    result: 'success',
    message: t.server.subtitles.successReceived,
    lang: input.lang,
    items,
  };
};

export default Search;