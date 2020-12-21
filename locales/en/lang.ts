import { Language } from '../../next-env';

const t: Language = {
  name: 'english',
  value: 'en',
  name1: 'русский',
  value1: 'ru',
  interface: {
    settings: 'settings',
    registration: 'registration',
    select_lang: 'select language',
    login: 'login',
    icon: 'icon',
    name: 'name',
    email: 'email',
    password: 'password',
    passwordRepeat: 'password repeat',
    home: 'home',
    send: 'send',
  },
  server: {
    user: {
      errorGetByEmail: 'error while getting user by email',
      warningAreRegistered: 'this email was registered earlier',
      errorRegistration: 'error while added new user',
      successRegistration: 'registration successfully',
    },
  },
};

export default t;
