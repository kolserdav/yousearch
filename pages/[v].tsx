import React from 'react';
import { NextComponentType, GetServerSidePropsContext } from 'next';
import { store, action } from '../src/store';
import Home, { HomeProps } from './index';
import * as Types from '../next-env';
import * as srv from '../services';

const HomeId: NextComponentType<any, any, HomeProps> = (props): React.ReactElement => {
  const { t, title, description, image, other, error } = props;
  return (
    <Home t={t} error={error} title={title} image={image} description={description} other={other} />
  );
};

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

/**
 * Get link handler
 * @param id {number} videoId
 */
const getLink = (id: number): void => {
  action<Types.Schema.Params.ID>({
    type: 'GET_LINK_REQUEST',
    body: {
      input: {
        id,
      },
      results: ['link', 'description'],
    },
  });
};

interface HomeServerSideProps {
  props: HomeProps;
}

/**
 * Page of created link
 * @param ctx
 */
export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<HomeServerSideProps> {
  const { locale, query }: any = ctx;
  const { v, i }: Types.Query = query;
  const lang = srv.getLang(locale);
  if (!i) {
    ctx.res.statusCode = 404;
    return {
      props: {
        t: lang,
        error: true,
      },
    };
  }
  /**
   * Get link
   */
  const link = await new Promise<Types.Schema.Values.Link>((resolve) => {
    const storeSubs = store.subscribe(() => {
      const state: Types.Action<any> = store.getState();
      if (state.type === 'GET_LINK') {
        const { body }: Types.Action<Types.Schema.Values.LinkRequest> = state;
        const { link } = body;
        if (!link) {
          resolve({
            result: 'error',
            message: body.toString(),
          });
        }
        resolve(link);
        storeSubs();
      }
    });
    getLink(parseInt(i));
  });
  if (link === null) {
    ctx.res.statusCode = 404;
    return {
      props: {
        t: lang,
        error: true,
      },
    };
  }
  /**
   * Get video info
   */
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
          });
        }
        resolve(info);
        storeSubs();
      }
    });
    getInfo(v);
  });
  return {
    props: {
      t: lang,
      error: false,
      title: info.title,
      image: info.image,
      description: link.description,
      other: true,
    },
  };
}

export default HomeId;
