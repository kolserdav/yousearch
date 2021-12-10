import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

const theme: Theme = {
  main: '#4285F4',
  light: '#deeaee',
  dark: '#3e4444',
  error: '#EA4335',
  warning: '#FBBC05',
  success: '#34A853',
  info: '#00d2ff',
  white: '#ffffff',
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
  --border-radius: calc(5px + (25 - 5) * ((100vw - 320px) / (7680 - 320)));
  --input-width: calc(300px + (1000 - 300) * ((100vw - 320px) / (7680 - 320)));
  --input-height: calc(20px + (80 - 20) * ((100vw - 320px) / (7680 - 320)));
  --container-width: calc(300px + (6000 - 300) * ((100vw - 320px) / (7680 - 320)));
  background-color: ${(props) => props.theme.light};
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

export default function Theme(props: ThemeProps): React.ReactElement {
  const { children } = props;
  return (
    <GlobalVariables theme={theme}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </GlobalVariables>
  );
}
