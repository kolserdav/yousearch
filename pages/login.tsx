import React from 'react';
import type { NextComponentType } from 'next';
import Theme from '../src/components/Theme';
import AppBar from '../src/components/AppBar';
import * as lib from '../src/lib';
import { StaticContext, StaticProps, Props } from '../next-env';

const Login: NextComponentType<any, any, Props> = (props): React.ReactElement => {
  const { t } = props;
  return (
    <Theme>
      <AppBar t={t} />
      <h1>{t.interface.login}</h1>
    </Theme>
  );
};

export const getStaticProps = ({ locale }: StaticContext): StaticProps => {
  const lang = lib.getLang(locale);
  return {
    props: {
      t: lang,
    },
  };
};

export default Login;
