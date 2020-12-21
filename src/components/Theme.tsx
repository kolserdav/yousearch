import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import * as Types from '../../next-env';

const theme: Types.Theme = {
  main: 'purple',
  light: 'pink',
  dark: 'blue',
  error: 'red',
  warning: 'orange',
  success: 'greeen',
  bg: 'rgba(0, 0, 0, 0.1)',
};

const GlobalVariables = styled.div`
  --input-size: calc(14px + (70 - 14) * ((100vw - 320px) / (7680 - 320)));
  --h1-size: calc(20px + (90 - 20) * ((100vw - 320px) / (7680 - 320)));
  --h5-size: calc(15px + (50 - 15) * ((100vw - 320px) / (7680 - 320)));
  --p-size: calc(12px + (40 - 12) * ((100vw - 320px) / (7680 - 320)));
  --menu-item-size: calc(12px + (80 - 12) * ((100vw - 320px) / (7680 - 320)));
  --menu-body-width: calc(300px + (1000 - 300) * ((100vw - 320px) / (7680 - 320)));
  --app-bar-height: (80px + (220 - 80) * ((100vw - 1200px) / (7680 - 1200)));
  --icon-width: calc(30px + (100 - 30) * ((100vw - 320px) / (7680 - 320)));
  --item-padding: calc(5px + (20 - 5) * ((100vw - 320px) / (7680 - 320)));
  --progress-height: calc(4px + (15 - 4) * ((100vw - 320px) / (7680 - 320)));
`;

export default function Theme(props: Types.ThemeProps): React.ReactElement {
  const { children } = props;
  return (
    <GlobalVariables>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </GlobalVariables>
  );
}