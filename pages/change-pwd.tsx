import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import * as Types from '../next-env';
import * as srv from '../services';
import AppBar from '../src/components/AppBar';
import Theme from '../src/components/Theme';
import { store, action } from '../src/store';
import Alert, { AlertProps } from '../src/components/ui/Alert';
import Input from '../src/components/ui/Input';
import Grid from '../src/components/ui/Grid';
import { H1, Label } from '../src/components/ui/Typography';
import Button from '../src/components/ui/Button';
import { NextComponentType } from 'next';

const Forgot: NextComponentType<any, any, Types.Props> = (props) => {
  const router = useRouter();
  const { e, k } = router.query;
  const { t } = props;
  const [password, setPassword] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');
  const [load, setLoad] = useState<boolean>(true);
  const _alert: AlertProps = {
    open: true,
    text: '',
    status: 'info',
    button: <div />,
  };
  const [alert, setAlert] = useState<AlertProps>(_alert);
  const changePassword = () => {
    setLoad(true);
    action({
      type: 'CHANGE_PASS_REQUEST',
      body: {
        input: {
          email: e,
          key: k,
          password,
          passwordRepeat,
        },
        results: ['message'],
      },
    });
  };
  useEffect(() => {
    setLoad(false);
    const storeSubs = store.subscribe(() => {
      const state: Types.Action<any> = store.getState();
      if (state.type === 'CHANGE_PASS') {
        setLoad(false);
        const { body }: Types.Action<Types.Schema.Values.ChangePassRequest> = state;
        const { changePass } = body;
        if (!changePass) {
          setAlert({
            open: true,
            text: body.toString(),
            status: 'error',
          });
          return;
        }
        setAlert({
          open: true,
          status: changePass.result,
          text: changePass.message,
        });
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
        <H1>{t.interface.changePassword}</H1>
        <FormItem>
          <Label>{t.interface.password}</Label>
          <Input
            type="password"
            value={password}
            onChange={(e: any) => {
              const { value } = e.target;
              setPassword(value);
            }}
          />
        </FormItem>
        <FormItem>
          <Label>{t.interface.passwordRepeat}</Label>
          <Input
            type="password"
            value={passwordRepeat}
            onChange={(e: any) => {
              const { value } = e.target;
              setPasswordRepeat(value);
            }}
          />
        </FormItem>
        <FormItem>
          <Button disabled={load} onClick={changePassword}>
            {t.interface.send}
          </Button>
        </FormItem>
        <FormItem>
          <Link href="/forgot">
            <LinkStyled>{t.interface.sendNewEmail}</LinkStyled>
          </Link>
        </FormItem>
        <Alert
          open={alert.open}
          status={alert.status}
          text={alert.text}
          trigger={alert.trigger}
          button={alert.button}
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

export const getStaticProps = ({ locale }: Types.StaticContext): Types.StaticProps => {
  const lang = srv.getLang(locale);
  return {
    props: {
      t: lang,
    },
  };
};

export default Forgot;
