import React, { useState } from 'react';
import type { NextPage } from 'next';
import Cookies from 'universal-cookie';
import { Typography, Select, FormGroup, FormLabel, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Theme from '../src/components/Theme';
import AppBar from '../src/components/AppBar';
import * as Types from '../next-env';
import useTranslate from '../src/hooks/useTranslate';

const cookies = new Cookies();

const useStyles = makeStyles({
  root: {
    maxWidth: '500px',
  },
});

const Settings: NextPage = (): React.ReactElement => {
  console.log(typeof window)
  const classes = useStyles();
  const [lang, setLang] = useState<string>('en');
  const t = useTranslate();
  return (
    <Theme>
      <AppBar>
        <Typography align="center" variant="h3" color="secondary">
          {t.interface.settings}
        </Typography>
        <FormGroup className={classes.root}>
          <FormLabel>{t.interface.select_lang}</FormLabel>
          <Select
            variant="filled"
            value={lang}
            onChange={(e: any) => {
              const { value } = e.target;
              setLang(value);
              const date = new Date();
              date.setFullYear(date.getFullYear() + 5);
              cookies.set('lang', value, { path: '/', expires: date });
            }}>
            <MenuItem value={t.value}>{t.name}</MenuItem>
            <MenuItem value={t.value1}>{t.name1}</MenuItem>
          </Select>
        </FormGroup>
      </AppBar>
    </Theme>
  );
};

export default Settings;
