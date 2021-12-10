import React, { useState, useEffect } from 'react';
import type { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import Theme from '../components/Theme';
import AppBar from '../components/AppBar';
import * as srv from '../services';
import { H1, Description } from '../components/ui/Typography';
import Grid from '../components/ui/Grid';
import Button from '../components/ui/Button';

const cookies = new Cookies();

/**
 * Logout page component
 * @param props {Props}
 */
const Login: NextComponentType<any, any, Props> = (props): React.ReactElement => {
  const router = useRouter();
  const { t } = props;
  const [load, setLoad] = useState<boolean>(true);
  const logout = (): void => {
    cookies.remove('_qt');
    router.push('/');
  };
  useEffect(() => {
    if (load) setLoad(false);
    return () => {
      /** */
    };
  }, []);
  return (
    <Theme>
      <AppBar t={t} load={load} />
      <Grid direction="column" align="center">
        <H1>{t.interface.logout}</H1>
        <Description>{t.interface.needLogout}?</Description>
        <Button onClick={logout}>{t.interface.logout}</Button>
      </Grid>
    </Theme>
  );
};

export const getStaticProps = ({ locale }: StaticContext): StaticProps => {
  const lang = srv.getLang(locale);
  return {
    props: {
      t: lang,
    },
  };
};

export default Login;
