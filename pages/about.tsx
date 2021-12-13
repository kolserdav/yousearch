import React, { useState, useEffect } from 'react';
import { NextComponentType } from 'next';
import styled from 'styled-components';
import * as srv from '../services';
import Theme from '../components/Theme';
import AppBar from '../components/AppBar';
import { H1, Description, Label } from '../components/ui/Typography';
import Grid from '../components/ui/Grid';

const repoUrl = 'https://github.com/kolserdav/yousearch';
const licenseUrl = 'https://www.gnu.org/licenses/gpl-3.0.ru.html';

/**
 * About page
 * @param props
 */
const About: NextComponentType<any, any, Props> = (props): React.ReactElement => {
  const { t } = props;
  const [load, setLoad] = useState<boolean>(true);
  useEffect(() => {
    setLoad(false);
  }, []);
  return (
    <Theme>
      <AppBar t={t} load={load} />
      <Grid direction="column" align="center">
        <Container>
          <H1>{t.interface.about}</H1>
          <Description>{t.content.about}</Description>
          <Description>
            {t.content.sourceCode}:&nbsp;
            <a rel="noreferrer" target="_blank" href={repoUrl}>
              {repoUrl}
            </a>
          </Description>
          <Description>
            {t.content.isLicensed}:&nbsp;
            <a rel="noreferrer" target="_blank" href={licenseUrl}>
              GNU GENERAL PUBLIC LICENSE
            </a>
          </Description>
          <Label>{t.content.donate}</Label>
          <DonateLink target="_blank" href="https://paypal.me/kolserdav">
            {t.content.donateLink}
          </DonateLink>
        </Container>
      </Grid>
    </Theme>
  );
};

const DonateLink = styled.a`
  margin: var(--item-padding);
  margin-bottom: 40px;
  text-transform: uppercase;
`;

const Container = styled.div`
  height: 100vh;
  width: var(--container-width);
`;

export const getStaticProps = ({ locale }: StaticContext): StaticProps => {
  const lang = srv.getLang(locale);
  return {
    props: {
      t: lang,
    },
  };
};

export default About;
