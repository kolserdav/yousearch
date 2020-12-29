import React from 'react';
import { NextComponentType } from 'next';
import { store, action } from '../src/store';
import Home, { HomeProps } from './index';
import * as Types from '../next-env';
import * as srv from '../services';

const HomeId: NextComponentType<any, any, HomeProps> = (props): React.ReactElement => {
  const { t, title, description, image } = props;
  return <Home t={t} title={title} image={image} description={description} />;
}

/**
 * Get video info handler for video by videoId
 * @param id {string} videoId
 */
const getInfo = (id: string): void => {
  action<Types.Schema.Params.Captions>({
    type: 'INFO_REQUEST',
    body: {
      input: {
        videoID: id,
      },
      results: ['message', 'title', 'image {url, width, height}'],
    },
  });
};

export async function getServerSideProps(ctx) {
  const { locale, query } = ctx;
  const { v, i, s, se } = query;
  console.log(query)
  const info = await new Promise<Types.Schema.Values.Info>((resolve) => {
    const storeSubs = store.subscribe(() => {
      const state: Types.Action<any> = store.getState();
      if (state.type === 'INFO') {
        const { body }: Types.Action<Types.Schema.Values.InfoRequest> = state;
        const { info } = body;
        if (!info) {
          resolve({
            result: 'error',
            message: body.toString(),
            title: '',
          });
        }
        resolve(info);
        storeSubs();
      }
    });
    getInfo(v);
  });
  const lang = srv.getLang(locale);
  return {
    props: {
      t: lang,
      title: info.title,
      image: info.image,
      description: 'TODO',
    },
  };
}

export default HomeId;
