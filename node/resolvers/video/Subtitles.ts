import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import * as srv from '../../../services';
import * as lib from '../../lib';

const prisma = new PrismaClient();

/**
 * Search subtitles route
 * @param _parent parent route
 * @param params {Schema.Params.Subtitles} request params
 * @param context context (headers)
 */
const Search: RequestHandler<Schema.Params.Subtitles, any> = async (_parent, params, context) => {
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
  if (!input.lang) {
    return {
      result: 'warning',
      message: t.server.subtitles.warningLangOfSubtitlesNotSend,
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
  const resSubs = await new Promise((resolve) => {
    axios
      .request({
        url: `https://www.googleapis.com/youtube/v3/captions/${videoID}`,
        method: 'GET',
        headers: {
          Authorization: `${type} ${access}`,
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
