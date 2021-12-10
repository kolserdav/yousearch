import React, { useState, useEffect } from 'react';
import type { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { setSessionCookie } from '../hooks/cookies';
import Theme from '../components/Theme';
import AppBar from '../components/AppBar';
import * as srv from '../services';
import { action, store } from '../store/index';
import { H1 } from '../components/ui/Typography';
import Input from '../components/ui/Input';
import Alert, { AlertProps } from '../components/ui/Alert';
import Grid from '../components/ui/Grid';
import IconButton from '../components/ui/IconButton';
import Button from '../components/ui/Button';

/**
 * Login page component
 * @param props {Props}
 */
const Login: NextComponentType<any, any, Props> = (props): React.ReactElement => {
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
    action<Schema.Params.Login>({
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
    setLoad(false);
    const storeSubs = store.subscribe(() => {
      const state: Action<any> = store.getState();
      if (state.type === 'LOGIN') {
        setLoad(false);
        const { body }: Action<Schema.Values.LoginRequest> = state;
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
        <FormItem>
          <Input
            type="email"
            value={email}
            onChange={(e: any) => {
              const { value } = e.target;
              setEmail(value);
            }}
            placeholder={t.interface.email}
          />
        </FormItem>
        <FormItem>
          <Input
            type="password"
            value={password}
            onChange={(e: any) => {
              const { value } = e.target;
              setPassword(value);
            }}
            placeholder={t.interface.password}
          />
        </FormItem>
        <FormItem>
          <Button disabled={load} onClick={login}>
            {t.interface.send}
          </Button>
        </FormItem>
        <FormItem>
          <Link href="/forgot">
            <LinkStyled>{t.interface.forgotPassword}</LinkStyled>
          </Link>
        </FormItem>
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

const FormItem = styled.div`
  margin: var(--item-padding);
`;

const LinkStyled = styled.a`
  cursor: pointer;
  color: ${(props) => props.theme.main};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  &:first-letter {
    text-transform: capitalize;
  }
`;

export const getStaticProps = ({ locale }: StaticContext): StaticProps => {
  const lang = srv.getLang(locale);
  return {
    props: {
      t: lang,
    },
  };
};

export default Login;
