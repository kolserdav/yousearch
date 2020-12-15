import React, { useState } from 'react';
import type { NextPage } from 'next';
import Cookies from 'universal-cookie';

import Theme from '../src/components/Theme';
import * as Types from '../next-env';
import useTranslate from '../src/hooks/useTranslate';

const cookies = new Cookies();


const Settings: NextPage = (): React.ReactElement => {
  const [lang, setLang] = useState<string>('en');
  const t = useTranslate();
  return (
    <Theme>
      
    </Theme>
  );
};

export default Settings;
