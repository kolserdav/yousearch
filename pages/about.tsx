import React, { useState, useEffect } from 'react';
import { NextComponentType } from 'next';
import styled from 'styled-components';
import * as Types from '../next-env';
import * as srv from '../services';
import Theme from '../src/components/Theme';
import AppBar from '../src/components/AppBar';
import { H1, Description, Label } from '../src/components/ui/Typography';
import Grid from '../src/components/ui/Grid';

/**
 * About page
 * @param props
 */
const About: NextComponentType<any, any, Types.Props> = (props): React.ReactElement => {
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
          <Label>{t.content.donate}</Label>
          <DonateLink
            target="_blank"
            href="https://www.tinkoff.ru/rm/kolmiller.sergey1/HtC4U66788/">
            {t.content.donateLink}
          </DonateLink>
        </Container>
      </Grid>
    </Theme>
  );
};

const DonateLink = styled.a`
  margin: var(--item-padding);
  text-transform: uppercase;
`;

const Container = styled.div`
  width: var(--container-width);
`;

export const getStaticProps = ({ locale }: Types.StaticContext): Types.StaticProps => {
  const lang = srv.getLang(locale);
  return {
    props: {
      t: lang,
    },
  };
};

export default About;
