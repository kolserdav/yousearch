import axios from 'axios';
import * as Types from '../../../next-env';
import * as orm from '../../orm';
import * as lib from '../../lib';
import * as srv from '../../../services';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
const { API_KEY } = serverRuntimeConfig;

/**
 * Google REST api
 * https://developers.google.com/youtube/v3/docs/caption
 */
interface SnippetInterface {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    videoId: string;
    lastUpdated: Date;
    trackKind: string;
    language: string;
    name: string;
    audioTrackType: string;
    isCC: boolean;
    isLarge: boolean;
    isEasyReader: boolean;
    isDraft: boolean;
    isAutoSynced: boolean;
    status: string;
    failureReason: string;
  };
}

/**
 * Google REST API
 * https://developers.google.com/youtube/v3/docs/captions/list
 */
interface CaptionsInterface {
  kind: string;
  etag: string;
  items: SnippetInterface[];
}

/**
 * Search subtitles route
 * @param _parent parent route
 * @param params {Types.Schema.Params.Captions} request params
 * @param context context (headers)
 */
const Captions: Types.RequestHandler<
  Types.Schema.Params.Captions,
  Types.Schema.Values.Captions
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
  const captions = await new Promise<Types.OrmResult<CaptionsInterface>>((resolve) => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/captions?key=${API_KEY}&videoId=${videoID}&part=snippet` //TODO &userIP=${headers['x-forvarded-for']}
      )
      .then((response) => {
        resolve({
          error: 0,
          data: response.data,
        });
      })
      .catch((e) => {
        const is404 = e.message.toString().match(/404$/);
        if (!is404) console.error(`<${Date()}> (GET_CAPTIONS_ERROR)`, e.toJSON());
        resolve({
          error: 1,
          data: e.message,
        });
      });
  });
  if (captions.error) {
    const is404 = captions.data.toString().match(/404$/);
    if (!is404) console.warn(headers);
    const errMess = is404
      ? t.server.subtitles.warningVideoNotFound
      : t.server.subtitles.errorGettingVideoCaptions;
    return {
      result: is404 ? 'warning' : 'error',
      message: errMess,
    };
  }
  if (captions.data.items.length === 0) {
    return {
      result: 'warning',
      message: t.server.subtitles.warningSubtitlesNotFound,
    };
  }
  const langs = captions.data.items.map((item) => {
    return {
      lang: item.snippet.language,
      type: item.snippet.trackKind,
    };
  });
  return {
    result: 'success',
    message: t.server.subtitles.successFound,
    items: langs,
  };
};

export default Captions;
