import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextPage, NextPageContext } from 'next';
import AppBar from '../src/components/AppBar';
import { store, action } from '../src/store';
import * as Types from '../next-env';
import { Values } from '../node/schemas';

const Home: NextPage = (props): React.ReactElement => {
  const [name, setName] = useState<string>('');

  store.subscribe(() => {
    const state = store.getState();
    const { body }: Types.Action<Values.RegistrationRequest> = state[state.type];
    if (state.type === 'REGISTRATION') {
      const { registration } = body;
      if (!registration) {
        console.error(body);
        return 1;
      }
      console.log(registration)
    }
  });

  const handleClick = () => {
    action({ type: 'REGISTRATION_REQUEST', body: {input: { name: 'kolserdav', email: 'dasda', passwordRepeat: 'dasd', password: 'das',}, results: ['token'] } });
  };

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{name}</h1>
      <AppBar />
    </div>
  )
}

Home.getInitialProps = async (ctx: NextPageContext) => {
  
  return {};
}


export default Home;
