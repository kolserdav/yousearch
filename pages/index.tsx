import React, { useState } from 'react';
import Head from 'next/head';
import { NextPage, NextPageContext } from 'next';
import { store, action } from './store';
import * as Types from '../next-env';

const Home: NextPage = (props): React.ReactElement => {
  const [name, setName] = useState<string>('');

  store.subscribe(() => {
    const state: Types.Reducer<Types.Schema.Values.User> = store.getState();
    const { body }: Types.Action<Types.Schema.Values.User> = state[state.type];
    if (state.type === 'USER_FETCH') {
      console.log(body.id)
    }
  });

  const handleClick = () => {
    action({ type: 'USER_FETCH_REQUEST', body: { name: 'kolserdav', results: ['id', 'login'] } });
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