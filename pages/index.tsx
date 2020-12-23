import React, { useState, useEffect } from 'react';
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
import { StaticContext, StaticProps, Props } from '../next-env';
import { H1, Description } from '../src/components/ui/Typography';

const defaultLink = 'https://www.youtube.com/watch?v=IkOVe40Sy0U';

const Home: NextComponentType<any, any, Props> = (props): React.ReactElement => {
  const { t } = props;
  const [link, setLink] = useState<string>('');
  const [linkValue, setLinkValue] = useState<string>('');
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
  const getLink = (link: string) => {
    /**
     * Check a different link types
     */
    let newLink: any = link.match(/watch\?v=[a-zA-Z0-9_]+/);
    newLink = newLink ? newLink[0] : null;
    let id: any = newLink ? newLink.replace('watch?v=', '') : null;
    if (!newLink) {
      newLink = link.match(/.be\/[a-zA-Z0-9_]+$/);
      newLink = newLink ? newLink[0] : null;
      id = newLink ? newLink.replace('.be/', '') : null;
    }
    if (!newLink) {
      newLink = link.match(/^[a-zA-Z0-9_]+$/);
      newLink = newLink ? newLink[0] : null;
      id = newLink;
    }
    // Return with alert if link not valid
    if (!id) {
      setAlert({
        open: true,
        text: t.messages.linkNotValid,
        status: 'warning',
        trigger: () => {
          setTimeout(() => {
            setAlert(_alert);
          }, 3000);
        },
      });
      return 1;
    }
    // Create embed link
    newLink = `https://www.youtube.com/embed/${id}`;
    setLinkValue(newLink);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoad(false)
    }, 3000)
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
        <LinkInput
          onChange={(e: any) => {
            const { value } = e.target;
            setLink(value);
            getLink(value);
          }}
          placeholder={defaultLink}
          value={link}
        />
        <br />
        <Player>
          <iframe
            width="100%"
            height="100%"
            src={linkValue}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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

const LinkInput = styled.input`
  margin: var(--item-padding);
  min-width: var(--input-width);
  min-height: var(--input-height);
  font-size: var(--p-size);
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
