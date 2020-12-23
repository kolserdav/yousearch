import React, { useState, useEffect } from 'react';
import type { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import { setSessionCookie } from '../src/hooks/cookies';
import Theme from '../src/components/Theme';
import AppBar from '../src/components/AppBar';
import * as srv from '../services';
import { action, store } from '../src/store/index';
import { H1 } from '../src/components/ui/Typography';
import Input from '../src/components/ui/Input';
import Alert, { AlertProps } from '../src/components/ui/Alert';
import Grid from '../src/components/ui/Grid';
import IconButton from '../src/components/ui/IconButton';
import Button from '../src/components/ui/Button';
import * as Types from '../next-env';

/**
 * Login page component
 * @param props {Types.Props}
 */
const Login: NextComponentType<any, any, Types.Props> = (props): React.ReactElement => {
  const router = useRouter();
  const { t } = props;
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
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [load, setLoad] = useState<boolean>(true);
  const login = (): void => {
    setLoad(true);
    action<Types.Schema.Params.Login>({
      type: 'LOGIN_REQUEST',
      body: {
        input: {
          email,
          password,
        },
        results: ['token', 'message'],
      },
    });
  };
  useEffect(() => {
    const storeSubs = store.subscribe(() => {
      const state: Types.Action<any> = store.getState();
      if (state.type === 'LOGIN') {
        setLoad(false);
        const { body }: Types.Action<Types.Schema.Values.LoginRequest> = state;
        const { login } = body;
        if (!login) {
          setAlert({
            open: true,
            text: body.toString(),
            status: 'error',
            trigger: () => {
              /** */
            },
          });
          return 1;
        }
        setAlert({
          open: true,
          text: login.message,
          status: login.result,
          button: (
            <IconButton
              src="/img/ui/close-white-36dp.svg"
              alt="close icon"
              onClick={() => {
                setAlert(_alert);
              }}
            />
          ),
        });
        if (login.result == 'success') {
          // Set session cookie
          setSessionCookie(login.token);
          setTimeout(() => {
            router.push('/');
          }, 2000);
        }
      }
    });
    if (load) setLoad(false);
    return () => {
      storeSubs();
    };
  }, []);
  return (
    <Theme>
      <AppBar t={t} load={load} />
      <Grid direction="column" align="center">
        <H1>{t.interface.login}</H1>
        <Input
          type="email"
          value={email}
          onChange={(e: any) => {
            const { value } = e.target;
            setEmail(value);
          }}
          placeholder={t.interface.email}
        />
        <Input
          type="password"
          value={password}
          onChange={(e: any) => {
            const { value } = e.target;
            setPassword(value);
          }}
          placeholder={t.interface.password}
        />
        <Button onClick={login}>{t.interface.send}</Button>
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

export const getStaticProps = ({ locale }: Types.StaticContext): Types.StaticProps => {
  const lang = srv.getLang(locale);
  return {
    props: {
      t: lang,
    },
  };
};

export default Login;
