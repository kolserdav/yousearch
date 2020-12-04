import React from 'react';
import type { NextPage } from 'next';
import { ThemeProvider } from 'styled-components';
import { theme, Button } from '../src/styles/theme';
import * as Types from '../next-env';

const Registration: NextPage = (): React.ReactElement => {
  console.log(theme)
  return (
    <div>
    <ThemeProvider theme={theme}>
      <Button>test</Button>
      <div>Registration</div>
    </ThemeProvider></div>
  );
}  

export default Registration;
