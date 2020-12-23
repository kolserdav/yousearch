import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { NextComponentType } from 'next';
import AppBar from '../src/components/AppBar';
import { store, action } from '../src/store';
import * as srv from '../services';
import Theme from '../src/components/Theme';
import * as Types from '../next-env';
import Alert, { AlertProps } from '../src/components/ui/Alert';
import Grid from '../src/components/ui/Grid';
import IconButton from '../src/components/ui/IconButton';
import { StaticContext, StaticProps, Props } from '../next-env';
import { H1, Description } from '../src/components/ui/Typography';

const defaultLink = 'https://www.youtube.com/watch?v=IkOVe40Sy0U';

const Home: NextComponentType<any, any, Props> = (props): React.ReactElement => {
  const { t } = props;
  const searchRef = useRef<React.Ref<HTMLInputElement>>();
  const [link, setLink] = useState<string>('');
  const [linkValue, setLinkValue] = useState<string>('');
  const [lang, setLang] = useState<string>('');
  const [languages, setLanguages] = useState<Types.Schema.Values.CaptionsItem[]>([]);
  const [videoID, setVideoID] = useState<string>('');
  const [search, setSearch] = useState<string>(t.interface.search);
  const [load, setLoad] = useState<boolean>(true);
  const _alert: AlertProps = {
    open: false,
    status: 'info',
    text: '',
    button: <div />,
    trigger: () => {
      /** */
    },
  };
  const [alert, setAlert] = useState<AlertProps>(_alert);
  /**
   * Close Alert button
   */
  const CloseButton = () => (
    <IconButton
      src="/img/ui/close-white-36dp.svg"
      alt="close icon"
      onClick={() => {
        setAlert(_alert);
      }}
    />
  );
  /**
   * Get embed link
   * @param link 
   */
  const getLink = (link: string) => {
    /**
     * Check a different link types
     */
    let newLink: any = link.match(/watch\?v=[a-zA-Z0-9_]{11}/);
    newLink = newLink ? newLink[0] : null;
    let id: any = newLink ? newLink.replace('watch?v=', '') : null;
    if (!newLink) {
      newLink = link.match(/.be\/[a-zA-Z0-9_]{11}$/);
      newLink = newLink ? newLink[0] : null;
      id = newLink ? newLink.replace('.be/', '') : null;
    }
    if (!newLink) {
      newLink = link.match(/^[a-zA-Z0-9_]{11}$/);
      newLink = newLink ? newLink[0] : null;
      id = newLink;
    }
    // Return the alert if link not valid
    if (!id) {
      setAlert({
        open: true,
        text: t.messages.linkNotValid,
        status: 'warning',
        button: <CloseButton />,
      });
      return 1;
    }
    setVideoID(id);
    getCaptions(id);
    //searchSubtitles();
    // Create embed link
    newLink = `https://www.youtube.com/embed/${id}`;
    setLinkValue(newLink);
  };
  /**
   * Search by subtitles handler
   */
  const searchSubtitles = (): void => {
    setLoad(true);
    action<Types.Schema.Params.Subtitles>({
      type: 'SUBTITLES_REQUEST',
      body: {
        input: {
          videoID,
          lang,
          search,
        },
        results: ['message', 'items {start, text}'],
      },
    });
  };
  /**
   * Get captions handler for video by videoId
   * @param id {string} videoId
   */
  const getCaptions = (id: string): void => {
    setLoad(true);
    action<Types.Schema.Params.Captions>({
      type: 'CAPTIONS_REQUEST',
      body: {
        input: {
          videoID: id,
        },
        results: ['message', 'items {lang, type}'],
      },
    });
  };
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 2000);
    const storeSubs = store.subscribe(() => {
      const state: Types.Action<any> = store.getState();
      /**
       * Search subtitles listener
       */
      if (state.type === 'SUBTITLES') {
        setLoad(false);
        console.log(state.body)
      }
      /**
       * Get captions listener
       */
      if (state.type === 'CAPTIONS') {
        setLoad(false);
        const { body }: Types.Action<Types.Schema.Values.CaptionsRequest> = state;
        const { captions } = body;
        if (!captions) {
          setAlert({
            open: true,
            text: body.toString(),
            status: 'error',
            trigger: () => {
              setTimeout(() => {
                setAlert(_alert);
              }, 3000);
            },
          });
          return 1;
        }
        setAlert({
          open: true,
          text: captions.message,
          status: captions.result,
          button: <CloseButton />,
        });
        if (captions.result === 'success') {
          const { items } = captions;
          setLang(items[0].lang);
          setLanguages(items);
        }
      }
    });
    return () => {
      storeSubs();
    };
  });
  return (
    <Theme>
      <Head>
        <title>{t.content.siteName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar t={t} load={load} />
      <Grid direction="column" align="center">
        <H1>{t.content.siteName}</H1>
        <Description>{t.content.siteDescription}.</Description>
        {/** Get video ID */}
        <Input
          disabled={load}
          onChange={(e: any) => {
            const { value } = e.target;
            setLink(value);
            getLink(value);
          }}
          placeholder={defaultLink}
          value={link}
        />
        {languages.length !== 0 && (
          <Grid direction="column" align="center">
            {/** Language subtitles select */}
            <LangSelect
              onChange={(e: any) => {
                const { value } = e.target;
                setLang(value);
              }}>
              {languages.map((option) => (
                <LangOption key={option.lang} value={option.lang}>
                  {option.lang}&nbsp;({option.type})
                </LangOption>
              ))}
            </LangSelect>
            {/** Search by subtitles */}
            <Input
              disabled={load}
              onChange={(e: any) => {
                const { value } = e.target;
                setSearch(value);
              }}
              placeholder={search}
            />
          </Grid>
        )}
        <br />
        <Player>
          <iframe
            onLoad={(e) => {
              //console.log(32, e.target)
            }}
            width="100%"
            height="100%"
            src={linkValue}
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={false}
          />
        </Player>
        <Alert
          open={alert.open}
          text={alert.text}
          button={alert.button}
          trigger={alert.trigger}
          status={alert.status}
        />
      </Grid>
    </Theme>
  );
};

const Player = styled.div`
  width: 100%;
  height: calc(100vw / (1920 / 1080));
  @media (min-width: 2000px) {
    width: 1920px;
    height: 1080px;
  }
`;

const Input = styled.input`
  margin: var(--item-padding);
  min-width: var(--input-width);
  min-height: var(--input-height);
  font-size: var(--p-size);
`;

const LangSelect = styled.select`
  margin: var(--item-padding);
  height: var(--input-height);
  min-width: calc(var(--input-width / 2));
`;
const LangOption = styled.option`
  height: var(--input-height);
`;

export const getStaticProps = ({ locale }: StaticContext): StaticProps => {
  const lang = srv.getLang(locale);
  return {
    props: {
      t: lang,
    },
  };
};

export default Home;
