import { Language } from '../../next-env';

const t: Language = {
  name: 'русский',
  value: 'ru',
  name1: 'english',
  value1: 'en',
  interface: {
    no: 'не',
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
    setLink: 'указать ссылку или идентификатор видео',
    selectLang: 'выбрать язык субтитров',
    subtitlesAreExists: 'найдены сохраненные ранее субтитры',
    minimum3Symbols: 'минимальная длина запроса это 3 символа',
    noResults: 'по запросу ничего не найдено',
    logout: 'выход',
    needLogout: 'хотите выйти',
    link: 'ссылка',
    createAndCopyLink: 'создать и скопировать ссылку',
    more: 'ещё',
    close: 'закрыть',
    confirmEmail: 'подтверждение почты',
    forgotPassword: 'забыли пароль',
    pageNotFound: 'страница не найдена',
    changePassword: 'сменить пароль',
    sendNewEmail: 'оправить новое письмо',
    copied: 'скопирвано',
    about: 'о сайте',
    accept: 'принимаю',
    policy: 'политику конфиденциальности',
  },
  content: {
    about:
      ' На данном сайте можно выполнить поиск по субтитрам видео ютюб. Для поиска по субтитрам видео нужно указать идентификатор видео. ИД видео определяется программой автоматически при передаче ссылки на видео. После указания ид видео система автоматически определит наличие субтитров всех возможных языков, после выбора языка субтитров можно выполнить по ним поиск. На сайте присутствует функционал по регистрации пользователей. В настоящее время регистрация дает пользователю возможность создания “красивых” ссылок. По этим ссылкам открывается страница с просмотром данных по этому моменту в видео, красивой она является потому, что при вставке её в социальных сетях, чтобы поделиться ею она будет иметь в качестве названия - название видео, в качестве описания отрывок из субтитров выбранных пользователем создавшим ссылку, и в качестве картинки - превью изображение видео.',
    siteName: 'поиск в субтитрах YouTube',
    siteDescription: 'укажите ссылку на видео и ищите в его субтитрах',
    donate:
      'Мы не получаем денег за разработку этого проекта, но для работы этой панели нам приходится тратить свои средства, поэтому мы будем рады если вы поддержите нас от чистого сердца:',
    donateLink: 'ссылка доната',
    sourceCode: 'исходный код этого проекта расположен на',
    isLicensed: 'исходный код распостраняется по лицензии',
    contactInformation: 'Напишите мне: <a href="uyem.ru@gmail.com">uyem.ru@gmail.com</a>',
    closed:
      'В настоящее время регистрация на нашем сайте закрыта. Мы ожидаем получение квоты на YouTube API, чтобы сделать авторизацию по всем правилам Google.',
    acceptTos:
      'Иcпользуя сервис вы подтверждаете согласие с условиями использования YouTube API <a href="https://www.youtube.com/static?template=terms">https://www.youtube.com/static?template=terms</a>',
  },
  messages: {
    linkNotValid: 'ссылка имеет неверный формат',
    linkCreatedAndCopied: 'ссылка создана и скопирована',
    warnigTimePointNotSelect: 'точка времени не выбрана',
    warningSearchValueNotSet: 'поисковой запрос не указан',
    warningSubtitlesLangNotSet: 'яхык субтитров не обозначен',
    warningVideoIDNotSet: 'идентификатор видео не указан',
    browserNotAccepted: 'в настоящее время этот браузер не поддерживается сайтом',
    warningEmailNotConfirm: 'почта не подтверждена',
  },
  meta: {
    keywords: 'поиск в субтитрах, ютуб, ютюб, youtube, по субтитрам, субтитры, поиск',
    description: 'бесплатный сервис для поиска ключевых слов по субтитрам видео YouTube',
  },
  server: {
    email: {
      send: 'на указанную почту отправлено письмо подтверждения',
      notSend: 'письмо подверждение не было отправлено',
    },
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
      warningKeyNotSend: 'ключ не передан',
      warningUserNotFound: 'пользователь не найден',
      warningKeyExpired: 'ключ просрочен',
      successEmailConfirmed: 'почта успашно подтверждена',
      warningEmailConfirmedEarlier: 'почта была подтверждена ранее',
      errorConfirmedEmail: 'ошибка подтверждения адреса почты',
      errorSendingForgotEmail: 'ошибка отправки письма для смены пароля',
      successForgotEmailIsSend: 'письмо для смены пароля отправлено',
      errorUpdatePassword: 'ошибка смены пароля',
      successPasswordUpdated: 'пароль изменен',
      successSendConfirmEmail: 'письмо подтверждения отправлено',
    },
    subtitles: {
      successFound: 'субтитры найдены',
      successReceived: 'субтитры получены',
      warningVideoIDNotSend: 'ИД видео не передан',
      errorGettingVideoCaptions: 'ошибка при получении списка субтитров видео',
      warningSubtitlesNotFound: 'субтитры не найдены',
      warningVideoNotFound: 'видео не найдено',
      errorGettingVideoSubtitles: 'ошибка при получении субтитров видео',
      warningLangOfSubtitlesNotSend: 'язык нужных субтитров не передан',
      errorGettingVideoInfo: 'ошибка получения информации о видео',
      warningVideoInfoNotFound: 'информация о видео не найдена',
      successVideoInfoReceived: 'информация о видео получена',
    },
    link: {
      errorCreate: 'ошибка создания ссылки',
      successCreated: 'ссылка создана',
      errorGettingLink: 'ошибка при получении ссылки',
      warningLinkNotFound: 'ссылка не найдена',
      successReceived: 'ссылка получена',
    },
    letter: {
      proofOfAddress: 'подтверждение адреса',
      hello: 'здравствуйте',
      youEmailAddress: 'ваш адрес почты был указан при регистрации на нашем сайте',
      toConfirmAddress: 'чтобы подтвердить данный адрес пожалуйста перейдите по следующей',
      link: 'ссылке',
      whichIsValid: 'которая действительна в течении',
      days: 'дней',
      changePassword: 'смена пароля',
      wasInitiated:
        'был инициирован процесс смены пароля, если это были вы, пожалуйста перейдите по следующей',
    },
  },
};
export default t;
