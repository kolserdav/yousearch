import React, { useState } from 'react';
import type { NextPage } from 'next';
import Cookies from 'universal-cookie';

import Theme from '../components/Theme';

const cookies = new Cookies();

const Settings: NextPage = (): React.ReactElement => {
  const [lang, setLang] = useState<string>('en');
  return (
    <Theme>
      <></>
    </Theme>
  );
};

export default Settings;
