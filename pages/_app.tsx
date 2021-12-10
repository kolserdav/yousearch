/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import '../styles/globals.scss';
function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
}

export default MyApp;
