import React, { useState } from 'react';
import Head from 'next/head';
import { NextPage, NextPageContext } from 'next';
import { store, action } from '../src/store';
import * as Types from '../next-env';

const Home: NextPage = (props): React.ReactElement => {
  const [name, setName] = useState<string>('');

  store.subscribe(() => {
    const state: Types.Reducer<Types.Schema.Values.RegistrationRequest> = store.getState();
    const { body }: Types.Action<Types.Schema.Values.RegistrationRequest> = state[state.type];
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
      <button onClick={handleClick}>Send</button>
    </div>
  )
}

Home.getInitialProps = async (ctx: NextPageContext) => {
  
  return {};
}


export default Home;