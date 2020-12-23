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
    search: 'поиск',
  },
  content: {
    siteName: 'поиск в субтитрах Youtube',
    siteDescription: 'укажите ссылку на видео и ищите в его субтитрах прямо с телефонa',
  },
  messages: {
    linkNotValid: 'ссылка имеет неверный формат',
  },
  server: {
    user: {
      errorGetByEmail: 'ошибка при получении пользователя по емайл',
      warningAreRegistered: 'данная почта уже была зарегистрирована ранее',
      errorRegistration: 'ошибка при регистрации нового пользователя',
      successRegistration: 'успешная регистрация',
      warningEmailNotSend: 'почта не передана',
      warningEmailNotValid: 'почта не действительна',
      warningPasswordNotSend: 'пароль не передан',
      warningPasswordRepeatNotSend: 'повтор пароля не передан',
      warningPasswordTooShort: 'пароль слишком короткий',
      warningPasswordsNotMatch: 'пароли не совпадают',
      warningInputParamsNotSend: 'параметры не переданы на сервер',
      infoMinimumPasswordLength: 'минимальная длина пароля: ',
      warningGetUserData: 'данные пользователя не получены',
      successLogin: 'успешный вход',
      warningEmailNotRegister: 'почта не зарегистреирована',
      warningEmailOrPasswordNotMatch: 'почта или пароль не совпадают',
    },
    subtitles: {
      successReceived: 'субтитры найдены',
      warningSearchStringNotSend: 'строка поиска не передана',
      warningVideoIDNotSend: 'ИД видео не передан',
      errorGettingVideoCaptions: 'ошибка при получении списка субтитров видео',
      warningSubtitlesNotFound: 'субтитры не найдены',
      warningVideoNotFound: 'видео не найдено',
    },
  },
};
export default t;
