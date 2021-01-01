import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
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
      const state: Types.Action<any> = store.getState();
      if (state.type === 'FORGOT') {
        setLoad(false);
        const { body }: Types.Action<Types.Schema.Values.ForgotRequest> = state;
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

export const getStaticProps = ({ locale }: Types.StaticContext): Types.StaticProps => {
  const lang = srv.getLang(locale);
  return {
    props: {
      t: lang,
    },
  };
};

export default Forgot;
