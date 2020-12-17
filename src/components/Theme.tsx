import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import * as Types from '../../next-env';

const theme = {
  main: 'purple',
  light: 'yellow',
  bg: 'rgba(0, 0, 0, 0.1)',
};

const GlobalVariables = styled.div`
  --input-size: calc(14px + (70 - 14) * ((100vw - 320px) / (7680 - 320)));
  --h1-size: calc(20px + (90 - 20) * ((100vw - 320px) / (7680 - 320)));
  --h5-size: calc(15px + (50 - 15) * ((100vw - 320px) / (7680 - 320)));
  --menu-item-size: calc(14px + (100 - 14) * ((100vw - 320px) / (7680 - 320)));
  --menu-body-width: calc(300px + (1000 - 300) * ((100vw - 320px) / (7680 - 320)));
  --icon-width: calc(40px + (200 - 40) * ((100vw - 320px) / (7680 - 320)));
`;

export default function Theme(props: Types.ThemeProps): React.ReactElement {
  const { children } = props;
  return (
    <GlobalVariables>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </GlobalVariables>
  );
}