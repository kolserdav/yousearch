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
      warningEmailNotSend: 'email not send',
      warningEmailNotValid: 'email are not valid',
      warningPasswordNotSend: 'password not send',
      warningPasswordRepeatNotSend: 'password repeat not send',
      warningPasswordTooShort: 'password too short',
      warningPasswordsNotMatch: 'passwords not match',
      warningInputParamsRegistrationNotSend: 'input params registration not send',
      infoMinimumPasswordLength: 'Minimum length of password is: ',
      warningGetUserData: 'user data not received',
    },
  },
};

export default t;
