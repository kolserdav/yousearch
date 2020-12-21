import { Language } from '../../next-env';

const t: Language = {
  name: 'русский',
  value: 'ru',
  name1: 'english',
  value1: 'en',
  interface: {
    settings: 'настройки',
    registration: 'регистрация',
    select_lang: 'выбор языка',
    login: 'войти',
    icon: 'иконка',
    name: 'имя',
    email: 'почта',
    password: 'пароль',
    passwordRepeat: 'повтор пароля',
    home: 'главная',
    send: 'отправить',
  },
  server: {
    user: {
      errorGetByEmail: 'ошибка при получении пользователя по емайл',
      warningAreRegistered: 'данная почта уже была зарегистрирована ранее',
      errorRegistration: 'ошибка при регистрации нового пользователя',
      successRegistration: 'успешная регистрация',
    },
  },
};
export default t;
