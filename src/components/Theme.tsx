import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import * as Types from '../../next-env';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

export default function Theme(props: Types.ThemeProps): React.ReactElement {
  const { children } = props;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}