import * as Types from '../../../next-env';
import * as orm from '../../orm';
import * as lib from '../../lib';
import * as srv from '../../../services';
import axios from 'axios';

const tC =
  'Bearer ya29.a0ARrdaM_r874rfrRz_Vx0ZrX1EZUqnsLRHxzDOFkO5FOGdXkiwlcvnvbkcpDxyi88oy4iT8D3lpGNJZIM48ZZrLfyxu2pXsr1bDnp-w5I_FCYjMizZSnpl1a1zO2rie06xwV6psnDJ2zHBTmfQgKBqyzhYVSe';

/**
 * Search subtitles route
 * @param _parent parent route
 * @param params {Types.Schema.Params.Subtitles} request params
 * @param context context (headers)
 */
const Search: Types.RequestHandler<Types.Schema.Params.Subtitles, any> = async (
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
  const { videoID } = input;
  if (!videoID) {
    return {
      result: 'warning',
      message: t.server.subtitles.warningVideoIDNotSend,
    };
  }
  if (!input.lang) {
    return {
      result: 'warning',
      message: t.server.subtitles.warningLangOfSubtitlesNotSend,
    };
  }
  const resSubs = await new Promise((resolve) => {
    axios
      .request({
        url: `https://www.googleapis.com/youtube/v3/captions/${videoID}`,
        method: 'GET',
        headers: {
          Authorization: tC,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error('Error get subtitles', err.response.data);
        resolve(err.response.data.error.message);
      });
  });
  return {
    result: 'error',
    message: resSubs,
    lang: input.lang,
    items: [],
  };
};

export default Search;
