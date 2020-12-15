import React from 'react';
import { ThemeProvider } from 'styled-components';
import * as Types from '../../next-env';

const theme = {
  main: 'black',
};

export default function Theme(props: Types.ThemeProps): React.ReactElement {
  const { children } = props;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}