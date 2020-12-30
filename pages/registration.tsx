import React, { useState, useEffect } from 'react';
import type { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import Theme from '../src/components/Theme';
import AppBar from '../src/components/AppBar';
import { setSessionCookie } from '../src/hooks/cookies';
import * as srv from '../services';
import Grid from '../src/components/ui/Grid';
import { StaticContext, StaticProps, Props } from '../next-env';
import Button from '../src/components/ui/Button';
import { store, action } from '../src/store';
import * as Types from '../next-env';
import { H1 } from '../src/components/ui/Typography';
import Input from '../src/components/ui/Input';
import Alert, { AlertProps } from '../src/components/ui/Alert';

export const getStaticProps = ({ locale }: StaticContext): StaticProps => {
  const lang = srv.getLang(locale);
  return {
    props: {
      t: lang,
    },
  };
};

/**
 * 
 * @param props 
 */
const Registration: NextComponentType<any, any, Props> = (props): React.ReactElement => {
  const { t } = props;
  const router = useRouter();
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
  const [load, setLoad] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');
  const registration = (): void => {
    setLoad(true);
    action<Types.Schema.Params.Registration>({
      type: 'REGISTRATION_REQUEST',
      body: {
        input: {
          email,
          password,
          passwordRepeat,
        },
        results: ['token', 'message', 'warning'],
      },
    });
  };
  useEffect(() => {
    setTimeout(() => {setLoad(false)}, 1000)
    const storeSubs = store.subscribe(() => {
      const state: Types.Action<any> = store.getState();
      if (state.type === 'REGISTRATION') {
        const { body }: Types.Action<Types.Schema.Values.RegistrationRequest> = state;
        const { registration } = body;
        setLoad(false);
        if (!registration) {
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
          text: registration.message,
          status: registration.result,
        });
        if (registration.result === 'success') {
          // Set session cookie
          setSessionCookie(registration.token);
          setTimeout(() => {
            setAlert({
              open: true,
              text: registration.warning,
              status: registration.result,
            });
            setTimeout(() => {
              router.push('/');
            }, 3000);
          }, 2000);
        }
      }
    });
    return () => {
      storeSubs();
    };
  }, []);
  return (
    <Theme>
      <AppBar t={t} load={load} />
      <Grid direction="column" align="center">
        <H1>{t.interface.registration}</H1>
        <Input
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setEmail(value);
          }}
          type="email"
          placeholder={t.interface.email}
        />
        <Input
          type="password"
          value={password}
          placeholder={t.interface.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setPassword(value);
          }}
        />
        <Input
          type="password"
          value={passwordRepeat}
          placeholder={t.interface.passwordRepeat}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setPasswordRepeat(value);
          }}
        />
        <Button type="submit" onClick={registration}>
          {t.interface.send}
        </Button>
        <Alert
          trigger={alert.trigger}
          button={alert.button}
          open={alert.open}
          status={alert.status}
          text={alert.text}
        />
      </Grid>
    </Theme>
  );
};

export default Registration;
