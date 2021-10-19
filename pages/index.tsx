import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import * as lib from '../src/lib';
import AppBar from '../src/components/AppBar';
import { store, action } from '../src/store';
import * as srv from '../services';
import Theme from '../src/components/Theme';
import * as Types from '../next-env';
import Alert, { AlertProps } from '../src/components/ui/Alert';
import Grid from '../src/components/ui/Grid';
import Button from '../src/components/ui/Button';
import { StaticContext, StaticProps, Props } from '../next-env';
import { H1, Description, Label } from '../src/components/ui/Typography';

interface UpdateQuery {
  // eslint-disable-next-line no-unused-vars
  (query: Types.Query): void;
}

const cookies = new Cookies();

const scrollSettings = {
  alignToTop: 'start',
  behavior: 'smooth',
};

const date = new Date();
date.setFullYear(date.getFullYear() + 12);

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
 * Check browser is old
 */
async function checkOldBrowser(): Promise<boolean> {
  return await new Promise((resolve) => {
    const img = new Image();
    img.onload = function () {
      resolve(false);
    };
    img.onerror = function () {
      resolve(true);
    };
    img.src = '/img/webp.webp';
  });
}

export interface HomeProps extends Props {
  t: Types.Language;
  error: boolean;
  title?: string;
  image?: Types.Schema.Values.Image;
  description?: string;
  other?: boolean;
}

interface SaveVisit {
  // eslint-disable-next-line no-unused-vars
  (isOld: boolean, width: number, height: number, path: string, error?: string): void;
}

/**
 * Save user visit
 * @param isOld {boolean}
 * @param width {number}
 * @param height {number}
 * @param error {string}
 */
const saveVisit: SaveVisit = (isOld, width, height, path, error = '') => {
  action({
    type: 'VISIT_REQUEST',
    body: {
      input: {
        is_old: isOld,
        width,
        height,
        path,
        error,
      },
      results: ['message'],
    },
  });
};

/**
 * Nome component for change status response when link not found
 * @param props
 */
const HomeComponent: NextComponentType<any, any, HomeProps> = (props): React.ReactElement => {
  const { t, title, image, description, other, error } = props;
  const router = useRouter();
  const { query }: any = router;
  const { v, s, se, ch, l }: any = query;
  const visitSavedRef = useRef<boolean>(false);
  const searchRef = useRef<any>();
  const playerRef = useRef<any>();
  const videoIDRef = useRef<string>();
  const langRef = useRef<string>();
  const subtitlesRef = useRef<Types.Schema.Values.SubtitlesItem[]>();
  const chunksRef = useRef<Types.Schema.Values.SubtitlesItem[][]>();
  const searchValueRef = useRef<string>('');
  const [link, setLink] = useState<string>('');
  const [linkValue, setLinkValue] = useState<string>('');
  const [lang, setLang] = useState<string>('');
  const [languages, setLanguages] = useState<Types.Schema.Values.CaptionsItem[]>([]);
  const [search, setSearch] = useState<string>('');
  const [load, setLoad] = useState<boolean>(false);
  const [subtitles, setSubtitles] = useState<Types.Schema.Values.SubtitlesItem[]>([]);
  const [auto, setAuto] = useState<boolean>(true);
  const [showMore, setShowMore] = useState<boolean>(false);
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
  /**
   * Create video player link
   * @param id {string} - video ID
   */
  const setEmbedLink = (id: string, start = s) => {
    videoIDRef.current = id;
    // Create embed link
    const newLink = `https://www.youtube.com/embed/${id}?start=${start}`;
    setLinkValue(newLink);
  };
  /**
   *
   * @param query {Query}
   */
  const updateQuery: UpdateQuery = (query) => {
    let lQ = query.l ? `&l=${query.l}` : '';
    /**
     * if this block is removed, then for some reason it disappears query.l ???
     */
    if (!query.l && langRef.current) {
      lQ = `&l=${langRef.current}`;
    }
    const seQ = query.se ? `&se=${query.se}` : '';
    const chQ = query.ch ? `&ch=${query.ch}` : '';
    const sQ = query.s ? `&s=${query.s}` : '';
    const iQ = query.i ? `&i=${query.i}` : '';
    router.push(`?v=${query.v}${lQ}${seQ}${chQ}${sQ}${iQ}`);
  };
  /**
   * Get embed link
   * @param link {string} - link or video ID
   */
  const getLink = (link: string) => {
    /**
     * Check a different link types
     */
    let newLink: any = link.match(/watch\?v=[a-zA-Z0-9_-]{11}/);
    newLink = newLink ? newLink[0] : null;
    let id: any = newLink ? newLink.replace('watch?v=', '') : null;
    if (!newLink) {
      newLink = link.match(/.be\/[a-zA-Z0-9_-]{11}$/);
      newLink = newLink ? newLink[0] : null;
      id = newLink ? newLink.replace('.be/', '') : null;
    }
    if (!newLink) {
      newLink = link.match(/^[a-zA-Z0-9_-]{11}$/);
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
    // Clear values
    searchValueRef.current = '';
    setSearch('');
    setSubtitles([]);
    // Set new values
    getCaptions(id);
    setEmbedLink(id);
    const newQ: Types.Query = Object.assign({}, query);
    newQ.v = id;
    updateQuery(newQ);
  };
  /**
   * Search subtitles into session storage with web worker
   */
  const searchSubtitles = async () => {
    const newQ: Types.Query = Object.assign({}, query);
    newQ.se = searchValueRef.current;
    updateQuery(newQ);
    setSubtitles([]);
    setLoad(true);
    let res = await lib.search(subtitlesRef.current, searchValueRef.current);
    setLoad(false);
    if (res.length === 0) {
      setAlert({
        open: true,
        status: 'warning',
        text: t.interface.noResults,
      });
      return;
    }
    const chunkSize = parseInt(process.env.NEXT_PUBLIC_RESULTS_INTO_PAGE);
    const chunks = [];
    const chunksCount = Math.round(res.length / chunkSize);
    if (res.length > chunkSize) {
      setShowMore(true);
      for (let i = 0, start = 0; i <= chunksCount; i++, start += chunkSize) {
        let end = start + chunkSize;
        if (i === chunksCount) {
          end = res.length;
        }
        chunks.push(res.slice(start, end));
      }
      chunksRef.current = chunks;
      const _ch = parseInt(ch) || 0;
      res = chunks.filter((item, i) => i <= _ch).flat();
    }
    setSubtitles(res);
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
          videoID: videoIDRef.current,
          lang,
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
  const keyDownListener = (e: any) => {
    if (searchRef.current === document.activeElement && e.code === 'Enter') {
      searchSubtitles();
    }
  };
  useEffect(() => {
    // Save visit
    if (!visitSavedRef.current) {
      visitSavedRef.current = true;
      const width = document.body.clientWidth;
      const height = document.body.clientHeight;
      checkOldBrowser()
        .then((isOld) => {
          saveVisit(isOld, width, height, router.asPath);
        })
        .catch((error) => {
          saveVisit(false, width, height, router.asPath, error.message);
        });
    }
    window.addEventListener('keydown', keyDownListener);
    // Fill data from query string
    if (v && !error) {
      if (v !== link) {
        setLink(v);
        setLinkValue(v);
        getCaptions(v);
        setEmbedLink(v);
      }
    }
    if (se && !error) {
      if (se !== search) {
        setSearch(se);
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
          subtitlesRef.current = items;
          if (se) {
            if (se === search || search === '') {
              searchValueRef.current = se;
              searchSubtitles();
            }
          }
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
          items.forEach((i: Types.Schema.Values.CaptionsItem) => {
            if (!l) {
              if (i.lang === cookie) {
                setLang(i.lang);
                langRef.current = i.lang;
              } else {
                langRef.current === null;
              }
            } else {
              setLang(l);
              langRef.current = l;
            }
          });
          // If default lang no match in captions
          if (!langRef.current) {
            langRef.current = items[0].lang;
            setLang(items[0].lang);
          }
          const newQ: Types.Query = Object.assign({}, query);
          newQ.l = langRef.current;
          updateQuery(newQ);
          setLanguages(items);
          setTimeout(() => {
            getSubtitles(langRef.current);
          }, 100);
        }
      }
    });
    return () => {
      // Ubsubscribe from storage
      storeSubs();
      // Remove window event listener
      window.removeEventListener('keydown', keyDownListener);
    };
  }, [v]);
  return (
    <Theme>
      <Head>
        <title>{title || t.content.siteName}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        {/**<meta property="fb:app_id" content="1377921982326538" />*/}
        <meta property="og:type" content="website" />
        <meta name="keywords" content={t.meta.keywords} />
        <meta name="description" content={description || t.meta.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={image?.url} />
        {/**<meta name="twitter:site" content="@DeedPanas" />*/}
        <meta name="twitter:title" content={title || t.content.siteName} />
        <meta name="twitter:description" content={description || t.meta.description} />
        <meta property="og:image" content={image?.url} />
        <meta name="twitter:image:src" content={image?.url} />
        <meta property="og:image:width" content={image?.width} />
        <meta property="og:image:height" content={image?.height} />
        <meta property="og:description" content={description || t.meta.description} />
        <meta property="og:title" content={title || t.content.siteName} />
        <meta property="og:url" content="https://next.uyem.ru/" />
        <meta property="og:updated_time" content="1608949224609" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <AppBar t={t} load={load} other={other} />
      <Grid direction="column" align="center">
        <a href="https://youtube.com" title="https://youtube.com">
          <div style={{ maxWidth: '90%', minWidth: '280px' }}>
            <img src="/YouTube_Logo.svg" />
          </div>
        </a>
        <H1>{title || t.content.siteName}</H1>
        <h5
          style={{ marginLeft: '2rem', marginRight: '2rem' }}
          dangerouslySetInnerHTML={{ __html: t.content.acceptTos }}
        />
        <Description style={{ marginLeft: '2rem', marginRight: '2rem' }}>
          {description || t.content.siteDescription}.
        </Description>
        {/** Get video ID */}
        <FormItem>
          <Label>{t.interface.setLink}</Label>
          <Input
            disabled={load || other}
            onChange={(e: any) => {
              const { value } = e.target;
              setLanguages([]);
              setLink(value);
              getLink(value);
            }}
            value={link}
          />
        </FormItem>
        {languages.length !== 0 && (
          <Grid direction="column" align="center">
            {/** Language subtitles select */}
            <FormItem>
              <Label>{t.interface.selectLang}</Label>
              <LangSelect
                disabled={load || other}
                value={lang}
                onChange={(e: any) => {
                  const { value } = e.target;
                  cookies.set('dlang', value, { expires: date, sameSite: 'strict' });
                  langRef.current = value;
                  setLang(value);
                  const newQ: Types.Query = Object.assign({}, query);
                  newQ.l = value;
                  updateQuery(newQ);
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
            </FormItem>
            {/** Search by subtitles */}
            <FormItem>
              <Label>{t.interface.search}</Label>
              <Input
                disabled={load || other}
                onChange={(e: any) => {
                  const { value } = e.target;
                  setSearch(value);
                  searchValueRef.current = value;
                }}
                value={search}
                ref={searchRef}
              />
            </FormItem>
            <Button disabled={load || other} onClick={searchSubtitles}>
              {t.interface.search}
            </Button>
            <Results>
              {subtitles.map((item: Types.Schema.Values.SubtitlesItem, index: number) => {
                const sReg = new RegExp(`^${s}\\.`);
                const beautiTime = getBeautiTime(item.start);
                return (
                  <Grid key={`res-${index}`} direction="row" align="center">
                    <Time
                      disabled={other}
                      selected={sReg.test(item.start)}
                      onClick={() => {
                        if (!other) {
                          const _start = item.start.replace(/\.\d+/, '');
                          const newQ: Types.Query = Object.assign({}, query);
                          newQ.s = _start;
                          updateQuery(newQ);
                          setAuto(true);
                          setEmbedLink(videoIDRef.current, _start);
                          playerRef.current.scrollIntoView(scrollSettings);
                        }
                      }}>
                      {beautiTime}
                    </Time>
                    <Content
                      selected={sReg.test(item.start)}
                      dangerouslySetInnerHTML={{
                        __html: item.text,
                      }}
                    />
                  </Grid>
                );
              })}
            </Results>
            {showMore && (
              <IconMore
                onClick={() => {
                  const oldCh = parseInt(ch) || 0;
                  const chunk = chunksRef.current[oldCh + 1];
                  if (chunk) {
                    const newQ: Types.Query = Object.assign({}, query);
                    newQ.ch = oldCh + 1;
                    updateQuery(newQ);
                    const res = subtitles.concat(chunk);
                    setSubtitles(res);
                  }
                  if (!chunksRef.current[oldCh + 2]) {
                    setShowMore(false);
                  }
                }}
                src="/img/ui/expand_more-black-36dp.svg"
                alt="arrow down"
              />
            )}
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
        <Alert open={alert.open} text={alert.text} trigger={alertTrigger} status={alert.status} />
      </Grid>
      <IconArrow
        onClick={() => {
          searchRef.current.scrollIntoView(scrollSettings);
        }}
        src="/img/ui/keyboard_arrow_up-white-36dp.svg"
        alt={`${t.interface.more} ${t.interface.icon}`}
        title={t.interface.more}
      />
    </Theme>
  );
};

/**
 * Home page
 * @param props {Props}
 */
const Home: NextComponentType<any, any, HomeProps> = (props): React.ReactElement => {
  const { t, title, image, description, other, error } = props;
  return (
    <div>
      {!error ? (
        <HomeComponent
          t={t}
          error={error}
          title={title}
          image={image}
          description={description}
          other={other}
        />
      ) : (
        <Theme>
          {/** 404 page if props.error */}
          <Grid justifyContent="center" minHeight="100vh" direction="column" align="center">
            <H1>{t.interface.pageNotFound}&nbsp;¯\_(ツ)_/¯</H1>
            <FormItem>
              <Link href="/">
                <a style={{ textTransform: 'uppercase' }}>{t.interface.home}</a>
              </Link>
            </FormItem>
          </Grid>
        </Theme>
      )}
    </div>
  );
};

const FormItem = styled.div`
  margin: 20px;
`;

interface TimeProps {
  selected: boolean;
  disabled: boolean;
}

/**
 * Item time of search results
 */
const Time = styled.div<TimeProps>`
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  min-width: 50px;
  color: ${(props) => (props.selected ? props.theme.main : props.theme.info)};
  padding: var(--item-padding);
  font-size: var(--p-size);
`;

const Results = styled.div``;

interface ContentProps {
  selected: boolean;
}

const Content = styled.div<ContentProps>`
  font-size: var(--p-size);
  margin-right: calc(var(--item-padding) / 2);
  padding: 2px;
  box-shadow: ${(props) => (props.selected ? '0 0 3px rgba(0, 0, 0, 0.5)' : 'none')};
`;

/**
 * Video player
 */
const Player = styled.div`
  z-index: 11;
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
  margin: var(--item-padding) 0;
  min-width: var(--input-width);
  min-height: var(--input-height);
  font-size: var(--p-size);
`;

/**
 * Selector of subtitles language
 */
const LangSelect = styled.select`
  font-size: var(--p-size);
  margin: var(--item-padding) 0;
  height: var(--input-height);
  min-width: 100px;
`;
const LangOption = styled.option`
  font-size: var(--p-size);
  height: var(--input-height);
`;

const IconArrow = styled.img`
  cursor: pointer;
  z-index: 10;
  position: fixed;
  left: calc(100vw - var(--icon-width) * 1.6);
  top: calc(100vh - var(--icon-width) * 2);
  width: var(--icon-width);
  height: var(--icon-width);
  &:hover {
    border: 2px solid ${(props) => props.theme.main};
    border-radius: calc(var(--icon-width));
  }
`;

const IconMore = styled.img`
  cursor: pointer;
  z-index: 0;
  position: relative;
  width: var(--icon-width);
  height: var(--icon-width);
`;

export const getStaticProps = (ctx: StaticContext): StaticProps => {
  const { locale } = ctx;
  const lang = srv.getLang(locale);
  return {
    props: {
      t: lang,
    },
  };
};

export default Home;
