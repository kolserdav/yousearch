import React from 'react';
import { ThemeProvider } from 'styled-components';
import * as Types from '../../next-env';

const theme = {
  main: 'purple',
  bg: 'rgba(0, 0, 0, 0.1)',
};

export default function Theme(props: Types.ThemeProps): React.ReactElement {
  const { children } = props;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}