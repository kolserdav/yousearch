import axios from 'axios';
import * as srv from '../../../services';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
const { API_KEY, API_URL } = serverRuntimeConfig;

const Info: RequestHandler<Schema.Params.Captions, Schema.Values.Info> = async (
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
  const info = await new Promise<OrmResult<any>>((resolve) => {
    axios
      .get(
        `${API_URL}/videos?key=${API_KEY}&id=${videoID}&part=snippet&userIP=${headers['x-forwarded-for']}`
      )
      .then((response) => {
        resolve({
          error: 0,
          data: response.data,
        });
      })
      .catch((e) => {
        const is404 = e.message.toString().match(/404$/);
        if (!is404) console.error(`<${Date()}> (GET_INFO_ERROR)`, e.toJSON());
        resolve({
          error: 1,
          data: e.message,
        });
      });
  });
  if (info.error) {
    const is404 = info.data.toString().match(/404$/);
    if (!is404) console.warn(headers);
    const errMess = is404
      ? t.server.subtitles.warningVideoNotFound
      : t.server.subtitles.errorGettingVideoInfo;
    return {
      result: is404 ? 'warning' : 'error',
      message: errMess,
    };
  }
  if (info.data.items.length === 0) {
    return {
      result: 'warning',
      message: t.server.subtitles.warningVideoInfoNotFound,
    };
  }
  const item = info.data.items[0].snippet;
  return {
    result: 'success',
    message: t.server.subtitles.successVideoInfoReceived,
    title: item.title,
    image: item.thumbnails.high,
  };
};

export default Info;
