import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import * as Comlink from 'comlink';
import AppBar from '../src/components/AppBar';
import { store, action } from '../src/store';
import * as srv from '../services';
import Theme from '../src/components/Theme';
import * as Types from '../next-env';
import Alert, { AlertProps } from '../src/components/ui/Alert';
import Grid from '../src/components/ui/Grid';
import Button from '../src/components/ui/Button';
import IconButton from '../src/components/ui/IconButton';
import { StaticContext, StaticProps, Props } from '../next-env';
import { H1, Description, Label } from '../src/components/ui/Typography';
import type { WorkerApi } from '../src/worker';

const cookies = new Cookies();

const date = new Date();
date.setFullYear(date.getFullYear() + 12);

let _videoID: string;

/**
 * Get time in format h:mm:ss
 * @param seconds {string}
 */
const getBeautiTime = (seconds: string): string => {
  const sec = parseFloat(seconds);
  const h = Math.floor(sec / 3600);
  let m: any = Math.floor((sec % 3600) / 60);
  let s: any = Math.floor((sec % 3600) % 60);
  m = m < 10 ? `0${m}` : `${m}`;
  s = s < 10 ? `0${s}` : `${s}`;
  return `${h}:${m}:${s}`;
};

/**
 * Home page
 * @param props {Props}
 */
const Home: NextComponentType<any, any, Props> = (props): React.ReactElement => {
  const { t } = props;
  const router = useRouter();
  const { v, s }: any = router.query;
  const searchRef = useRef<any>();
  const playerRef = useRef<any>();
  const [link, setLink] = useState<string>('');
  const [linkValue, setLinkValue] = useState<string>('');
  const [lang, setLang] = useState<string>('');
  const [languages, setLanguages] = useState<Types.Schema.Values.CaptionsItem[]>([]);
  const [search, setSearch] = useState<string>('');
  const [load, setLoad] = useState<boolean>(false);
  const [subtitles, setSubtitles] = useState<Types.Schema.Values.SubtitlesItem[]>([]);
  const [auto, setAuto] = useState<boolean>(true);
  // For comlink
  const comlinkWorkerRef = React.useRef<Worker>();
  const comlinkWorkerApiRef = React.useRef<Comlink.Remote<WorkerApi>>();
  // Initial alert
  const _alert: AlertProps = {
    open: false,
    status: 'success',
    text: '',
  };
  const [alert, setAlert] = useState<AlertProps>(_alert);
  const alertTrigger = () => {
    if (alert.open) setAlert({ open: false, text: alert.text, status: alert.status });
  };
  const alertButton = (
    <IconButton src="/img/ui/close-white-36dp.svg" alt="close icon" onClick={alertTrigger} />
  );
  /**
   * Create video player link
   * @param id {string} - video ID
   */
  const setEmbedLink = (id: string, start = s) => {
    _videoID = id;
    // Create embed link
    const newLink = `https://www.youtube.com/embed/${id}?start=${start}`;
    setLinkValue(newLink);
  };
  /**
   * Get embed link
   * @param link {string} - link or video ID
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
      });
      return 1;
    }
    getCaptions(id);
    setEmbedLink(id);
    router.push(`/?v=${id}`);
  };
  /**
   * Search subtitles into session storage with web worker
   */
  const searchSubtitles = async () => {
    setLoad(true);
    const subsStr = window.sessionStorage.getItem('_subtitles');
    const subsObj = JSON.parse(subsStr);
    const r = await comlinkWorkerApiRef.current?.search(subsObj, search);
    setLoad(false);
    setSubtitles(r);
  };
  /**
   * Get subtitles from server
   * @lang {string}
   */
  const getSubtitles = (lang: string): void => {
    setLoad(true);
    action<Types.Schema.Params.Subtitles>({
      type: 'SUBTITLES_REQUEST',
      body: {
        input: {
          videoID: _videoID,
          lang: lang,
        },
        results: ['message', 'lang', 'items {start, text}'],
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
    // Get comlink web worker
    comlinkWorkerRef.current = new Worker('../src/worker', { type: 'module' });
    comlinkWorkerApiRef.current = Comlink.wrap<WorkerApi>(comlinkWorkerRef.current);
    if (v) {
      if (v !== link) {
        setLink(v);
        setLinkValue(v);
        getCaptions(v);
        setEmbedLink(v);
      }
    }
    /**
     * Subscribe to storage
     */
    const storeSubs = store.subscribe(() => {
      const state: Types.Action<any> = store.getState();
      /**
       * Get subtitles listener
       */
      if (state.type === 'SUBTITLES') {
        setLoad(false);
        const { body }: Types.Action<Types.Schema.Values.SubtitlesRequest> = state;
        const { subtitles } = body;
        if (!subtitles) {
          setAlert({
            open: true,
            text: body.toString(),
            status: 'error',
          });
          return 1;
        }
        setAlert({
          open: true,
          text: subtitles.message,
          status: subtitles.result,
        });
        if (subtitles.result === 'success') {
          const { items } = subtitles;
          // Save all subtitles of video in sessionStorage
          window.sessionStorage.setItem('_subtitles', JSON.stringify(items));
        }
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
          });
          return 1;
        }
        setAlert({
          open: true,
          text: captions.message,
          status: captions.result,
        });
        if (captions.result === 'success') {
          const { items } = captions;
          // Set default lang from cookie
          const cookie = cookies.get('dlang');
          let _lang: string;
          items.forEach((i: Types.Schema.Values.CaptionsItem) => {
            if (i.lang === cookie) {
              setLang(i.lang);
              _lang = i.lang;
            }
          });
          // If default lang no match in captions
          if (!_lang) {
            _lang = items[0].lang;
            setLang(items[0].lang);
          }
          setLanguages(items);
          setTimeout(() => {
            getSubtitles(_lang);
          }, 100);
        }
      }
    });
    return () => {
      // Ubsubscribe from storage
      storeSubs();
      // Terminate comlink worker
      comlinkWorkerRef.current?.terminate();
    };
  }, [v]);
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
            setLanguages([]);
            setLink(value);
            getLink(value);
          }}
          placeholder={t.interface.setLink}
          value={link}
        />
        {languages.length !== 0 && (
          <Grid direction="column" align="center">
            <Label>{t.interface.selectLang}</Label>
            {/** Language subtitles select */}
            <LangSelect
              disabled={load}
              value={lang}
              onChange={(e: any) => {
                const { value } = e.target;
                cookies.set('dlang', value, { expires: date, sameSite: 'strict' });
                setLang(value);
                setTimeout(() => {
                  getSubtitles(value);
                }, 150);
              }}>
              {languages.map((option, index) => (
                <LangOption key={`${option.lang}-${index}`} value={option.lang}>
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
              value={search}
              placeholder={t.interface.search}
              ref={searchRef}
            />
            <Button disabled={load} onClick={searchSubtitles}>
              {t.interface.search}
            </Button>
            <Results>
              {subtitles.map((item: Types.Schema.Values.SubtitlesItem, index: number) => {
                const sReg = new RegExp(`^${s}.`);
                const beautiTime = getBeautiTime(item.start);
                return (
                  <Grid key={`res-${index}`} direction="row" align="center">
                    <Time
                      selected={sReg.test(item.start)}
                      onClick={() => {
                        const _start = item.start.replace(/\.\d+/, '');
                        router.push(`/?v=${v}&s=${_start}`);
                        setAuto(true);
                        setEmbedLink(_videoID, _start);
                        playerRef.current.scrollIntoView({
                          alignToTop: 'start',
                          behavior: 'smooth',
                        });
                      }}>
                      {beautiTime}
                    </Time>
                    <Content
                      dangerouslySetInnerHTML={{
                        __html: item.text,
                      }}
                    />
                  </Grid>
                );
              })}
            </Results>
          </Grid>
        )}
        <br />
        <Player ref={playerRef}>
          <iframe
            onLoad={(e) => {
              //console.log(32, e.target)
            }}
            width="100%"
            height="100%"
            src={linkValue}
            frameBorder="0"
            allow={`accelerometer; ${
              auto ? 'autoplay;' : ''
            } clipboard-write; encrypted-media; gyroscope; picture-in-picture`}
            allowFullScreen={true}
          />
        </Player>
        <Alert
          open={alert.open}
          text={alert.text}
          button={alertButton}
          trigger={alertTrigger}
          status={alert.status}
        />
      </Grid>
    </Theme>
  );
};

interface TimeProps {
  selected: boolean;
}

/**
 * Item time of search results
 */
const Time = styled.div<TimeProps>`
  cursor: pointer;
  min-width: 50px;
  color: ${(props) => (props.selected ? props.theme.main : props.theme.info)};
  padding: var(--item-padding);
`;

const Results = styled.div``;

const Content = styled.div`
  margin-right: calc(var(--item-padding) / 2);
  padding: 2px;
`;

/**
 * Video player
 */
const Player = styled.div`
  width: 100%;
  height: calc(100vw / (1920 / 1080));
  @media (min-width: 2000px) {
    width: 1920px;
    height: 1080px;
  }
`;

/**
 * Input link and input search
 */
const Input = styled.input`
  margin: var(--item-padding);
  min-width: var(--input-width);
  min-height: var(--input-height);
  font-size: var(--p-size);
`;

/**
 * Selector of subtitles language
 */
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
