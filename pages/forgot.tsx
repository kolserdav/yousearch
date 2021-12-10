import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import * as srv from '../services';
import AppBar from '../components/AppBar';
import Theme from '../components/Theme';
import { store, action } from '../store';
import Alert, { AlertProps } from '../components/ui/Alert';
import Input from '../components/ui/Input';
import Grid from '../components/ui/Grid';
import { H1, Label } from '../components/ui/Typography';
import Button from '../components/ui/Button';
import { NextComponentType } from 'next';

const Forgot: NextComponentType<any, any, Props> = (props) => {
  const router = useRouter();
  const { t } = props;
  const [email, setEmail] = useState<string>('');
  const [load, setLoad] = useState<boolean>(true);
  const _alert: AlertProps = {
    open: true,
    text: '',
    status: 'info',
    button: <div />,
  };
  const [alert, setAlert] = useState<AlertProps>(_alert);
  const sendForgot = () => {
    setLoad(true);
    action({
      type: 'FORGOT_REQUEST',
      body: {
        input: {
          email,
        },
        results: ['message'],
      },
    });
  };
  useEffect(() => {
    setLoad(false);
    const storeSubs = store.subscribe(() => {
      const state: Action<any> = store.getState();
      if (state.type === 'FORGOT') {
        setLoad(false);
        const { body }: Action<Schema.Values.ForgotRequest> = state;
        const { forgot } = body;
        if (!forgot) {
          setAlert({
            open: true,
            text: body.toString(),
            status: 'error',
          });
          return;
        }
        setAlert({
          open: true,
          status: forgot.result,
          text: forgot.message,
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
        <H1>{t.interface.forgotPassword}</H1>
        <FormItem>
          <Label>{t.interface.email}</Label>
          <Input
            type="email"
            value={email}
            onChange={(e: any) => {
              const { value } = e.target;
              setEmail(value);
            }}
          />
        </FormItem>
        <FormItem>
          <Button disabled={load} onClick={sendForgot}>
            {t.interface.send}
          </Button>
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

export const getStaticProps = ({ locale }: StaticContext): StaticProps => {
  const lang = srv.getLang(locale);
  return {
    props: {
      t: lang,
    },
  };
};

export default Forgot;
