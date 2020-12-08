import React from 'react';
import { AppBar as Bar, Slide, useScrollTrigger, Toolbar, Typography, Container, Box } from '@material-ui/core';
import Menu from './Menu';
import * as Types from '../../next-env';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function AppBar(props: Types.AppBarProps): React.ReactElement {
  const { children } = props;
  return (
    <div>
      <HideOnScroll {...props}>
        <Bar>
          <Toolbar>
            <Menu />
            <Typography variant="h6">Scroll to Hide App Bar</Typography>
          </Toolbar>
        </Bar>
      </HideOnScroll>
      <Toolbar />
      <Container>{children}</Container>
    </div>
  );
}