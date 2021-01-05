import { Language } from '../../next-env';

const t: Language = {
  name: 'english',
  value: 'en',
  name1: 'русский',
  value1: 'ru',
  interface: {
    no: 'no',
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
    search: 'search',
    setLink: 'set link or video ID',
    selectLang: 'select lang of needed subtitles',
    subtitlesAreExists: 'previously saved subtitles found',
    minimum3Symbols: 'minimum request length is 3 characters',
    noResults: 'no results found',
    logout: 'logout',
    needLogout: 'you need logout',
    link: 'link',
    createAndCopyLink: 'create and copy link',
    more: 'more',
    close: 'close',
    confirmEmail: 'confirm email',
    forgotPassword: 'forgot password',
    pageNotFound: 'page not found',
    changePassword: 'change password',
    sendNewEmail: 'send new email',
    copied: 'copied',
    about: 'about this site',
  },
  content: {
    about:
      'On this site, you can search for YouTube video subtitles. To search for video subtitles, you need to specify the video ID. The video ID is determined by the program automatically when the video link is sent. After specifying the video ID, the system will automatically detect the presence of subtitles in all possible languages, after selecting the subtitle language, you can search for them. The site has a user registration functionality. Currently, registration gives the user the opportunity to create "beautiful" links. These links open a page with viewing data for this moment in the video, it is beautiful because when you insert it on social networks to share it, it will have as a title - the name of the video, as a description an excerpt from the subtitles selected by the user who created the link , and as a picture - a preview of the video image.',
    siteName: 'Youtube subtitle search',
    siteDescription: 'provide a link to the video and search in its subtitles',
    donate:
      'We do not receive money for the development of this project, but for the operation of this panel we have to spend our own money, so we will be glad if you support us from the bottom of your heart:',
    donateLink: 'donate link',
    sourceCode: 'the source code of this project is located at',
    isLicensed: 'source code is licensed',
  },
  messages: {
    linkNotValid: 'link not valid',
    linkCreatedAndCopied: 'link created and copied',
    warnigTimePointNotSelect: 'time point not selected',
    warningSearchValueNotSet: 'search value not typed',
    warningSubtitlesLangNotSet: 'subtitles language not set',
    warningVideoIDNotSet: 'video ID not set',
    browserNotAccepted: 'in current time this browser not accepted',
    warningEmailNotConfirm: 'email not confirm',
  },
  meta: {
    keywords: 'subtitle search, youtube, youtube, youtube, subtitle, subtitle, search',
    description: 'free service for searching keywords by subtitles of Youtube videos',
  },
  server: {
    email: {
      send: 'a confirmation letter has been sent to the specified mail',
      notSend: 'confirmation email not sent',
    },
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
      warningInputParamsNotSend: 'input params not send',
      infoMinimumPasswordLength: 'Minimum length of password is: ',
      warningGetUserData: 'user data not received',
      successLogin: 'success login',
      warningEmailNotRegister: 'email not registered',
      warningEmailOrPasswordNotMatch: 'email or password not match',
      warningKeyNotSend: 'key not send',
      warningUserNotFound: 'user not found',
      warningKeyExpired: 'key is expired',
      successEmailConfirmed: 'email confirmed successfully',
      warningEmailConfirmedEarlier: 'email is confirmed earlier',
      errorConfirmedEmail: 'error confirmed email',
      errorSendingForgotEmail: 'error sending forgot email',
      successForgotEmailIsSend: 'forgort email is send',
      errorUpdatePassword: 'error update password',
      successPasswordUpdated: 'password updated',
      successSendConfirmEmail: 'confirm email is send',
    },
    subtitles: {
      successFound: 'subtitles found',
      successReceived: 'subtitles received',
      warningVideoIDNotSend: 'video ID not send',
      errorGettingVideoCaptions: 'error getting video captions',
      warningSubtitlesNotFound: 'subtitles not found',
      warningVideoNotFound: 'video not found',
      errorGettingVideoSubtitles: 'error getting video subtitles',
      warningLangOfSubtitlesNotSend: 'lang of subtitles not send',
      errorGettingVideoInfo: 'error getting video info',
      warningVideoInfoNotFound: 'video info not found',
      successVideoInfoReceived: 'video info received',
    },
    link: {
      errorCreate: 'error create link',
      successCreated: 'link created',
      errorGettingLink: 'error link received',
      warningLinkNotFound: 'link not found',
      successReceived: 'link received',
    },
    letter: {
      proofOfAddress: 'proof of address',
      hello: 'hello',
      youEmailAddress: 'your email address was specified when registering on our website',
      toConfirmAddress: 'to confirm this address please go to the following',
      link: 'link',
      whichIsValid: 'which is valid for',
      days: 'days',
      changePassword: 'change password',
      wasInitiated:
        'the process of changing the password was initiated, if it was you, please go to the next',
    },
  },
};

export default t;
