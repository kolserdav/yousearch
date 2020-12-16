import React from 'react';
import type { NextComponentType } from 'next';
import styled from 'styled-components';
import Theme from '../src/components/Theme';
import AppBar from '../src/components/AppBar';
import * as lib from '../src/lib';
import Grid from '../src/components/ui/Grid';
import { StaticContext, StaticProps, Props } from '../next-env';

export const getStaticProps = ({ locale }: StaticContext): StaticProps => {
  const lang = lib.getLang(locale);
  return {
    props: {
      t: lang,
    },
  };
};

const Registration: NextComponentType<any, any, Props> = (props): React.ReactElement => {
  const { t } = props;
  return (
    <Theme>
      <AppBar t={t} />
      <Grid direction='column' align='center'>
        <H1>{t.interface.registration}</H1>
        <Input placeholder={t.interface.email} />
      </Grid>
    </Theme>
  );
};

const H1 = styled.h1`
  text-transform: capitalize;
`;

const Input = styled.input`
  font-size: large;
`;

export default Registration;
