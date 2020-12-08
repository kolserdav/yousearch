import React from 'react';
import type { NextPage } from 'next';
import { Typography } from '@material-ui/core';
import Theme from '../src/components/Theme';
import AppBar from '../src/components/AppBar';
import * as Types from '../next-env';

const Registration: NextPage = (): React.ReactElement => {
  return (
    <Theme>
      <AppBar>
        <Typography align="center" variant="h3" color="secondary">
          Registration
        </Typography>
      </AppBar>
    </Theme>
  );
};

export default Registration;
