import React, { useState, useEffect } from 'react';
import type { NextComponentType } from 'next';
import styled from 'styled-components';
import Theme from '../src/components/Theme';
import AppBar from '../src/components/AppBar';
import * as lib from '../src/lib';
import Grid from '../src/components/ui/Grid';
import { StaticContext, StaticProps, Props } from '../next-env';
import Button from '../src/components/ui/Button';
import { store, action } from '../src/store';
import * as Types from '../next-env';

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
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');
  const registration = () => {
    action({type: 'REGISTRATION_REQUEST',
      body: {
        input: {
          email,
          password,
          passwordRepeat,
        },
        results: ['token'],
      },
    });
  };
  useEffect(() => {
    const storeSubs = store.subscribe(() => {
      const state: Types.Reducer<Types.Schema.Values.Registration> = store.getState();
      console.log(state.REGISTRATION.body);
      //TODO
    });
    return () => {
      storeSubs();
    };
  }, []);
  return (
    <Theme>
      <AppBar t={t} />
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
        <Button type="submit" onClick={registration}>{t.interface.send}</Button>
      </Grid>
    </Theme>
  );
};

const H1 = styled.h1`
  text-transform: capitalize;
  font-size: var(--h1-size);
`;

const Input = styled.input`
  margin: 15px;
  font-size: var(--input-size);
`;

export default Registration;
