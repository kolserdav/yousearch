import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import * as srv from '../../../services';
import getConfig from 'next/config';
import * as lib from '../../lib';
const { serverRuntimeConfig } = getConfig();
const { API_KEY, API_URL } = serverRuntimeConfig;

const prisma = new PrismaClient();

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
 * @param params {Schema.Params.Captions} request params
 * @param context context (headers)
 */
const Captions: RequestHandler<Schema.Params.Captions, Schema.Values.Captions> = async (
  _parent,
  params,
  context
) => {
  const { headers } = context;
  const { lang, authorization } = headers;
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
  const parsedToken = lib.parseToken(authorization);
  if (!parsedToken) {
    return {
      result: 'warning',
      message: t.server.forbidden,
    };
  }
  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        id: parsedToken.id,
      },
      select: {
        Token: true,
      },
    });
  } catch (e) {
    console.error(`<${Date()}> (GET_USER_ERROR)`, e.toJSON());
    return {
      result: 'error',
      message: t.server.user.errorGetByEmail,
    };
  }
  if (user === null) {
    return {
      result: 'warning',
      message: t.server.user.warningUserNotFound,
    };
  }
  const { Token } = user;
  const { type, access } = Token[0];
  const captions = await new Promise<OrmResult<CaptionsInterface>>((resolve) => {
    axios
      .get(`${API_URL}/captions?videoId=${videoID}&part=snippet`, {
        headers: {
          authorization: `${type} ${access}`,
        },
      })
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
      id: item.id,
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
