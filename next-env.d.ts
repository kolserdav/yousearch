/**
 * Application types (Frontend)
 * Types of requests show in /node/schecmas/index.ts
 */
/* eslint-disable no-unused-vars */
/// <reference types="next" />
/// <reference types="next/types/global" />
import * as Schema from './node/schemas'; // Import requests types
export { Schema };

export declare namespace ActionTypes {
  export declare type Login = 'LOGIN_REQUEST' | 'LOGIN';
  export declare type Registration = 'REGISTRATION_REQUEST' | 'REGISTRATION';
  export declare type Subtitles = 'SUBTITLES_REQUEST' | 'SUBTITLES';
  export declare type Captions = 'CAPTIONS_REQUEST' | 'CAPTIONS';
  export declare type Info = 'INFO_REQUEST' | 'INFO';
  export declare type Auth = 'AUTH_REQUEST' | 'AUTH';
  export declare type Link = 'LINK_REQUEST' | 'LINK';
  export declare type GetLink = 'GET_LINK_REQUEST' | 'GETE_LINK';
  export declare type Confirm = 'CONFIRM_REQUEST' | 'CONFIRM';
  export declare type All =
    | User
    | Registration
    | Login
    | Subtitles
    | Captions
    | Info
    | Auth
    | Link
    | GetLink
    | Confirm
    | 'INITIAL';
}

export type Query = {
  v: string;
  l: string;
  se: string;
  ch: number;
  s: string;
  i: string;
  e: string;
  k: string;
};

export type Action<T> = {
  type: ActionTypes.All;
  body: T;
};

export type Resolvers = {
  Query: Schema.Query;
};

export type Reducer<T> = {
  type: ActionTypes.All;
  body: Action<T>;
  [key?: string]: Action<T>;
};

export type RequestCallback<T, U> = (context: Types.Action<T>, ...args: any[]) => U;

export interface Request<T> {
  context: unknown;
  fn: (context: Types.Action<T>, ...args: any[]) => Promise<any>;
}

export declare type Result = 'error' | 'warning' | 'success';

export declare type ThemeProps = {
  children: React.ReactElement | React.ReactElement[];
};

export declare type AppBarProps = {
  children: React.ReactElement | React.ReactElement[];
};

declare type LanguageName = 'русский' | 'english';
export declare type LanguageValue = 'ru' | 'en';

export declare interface Language {
  name: LanguageName;
  value: LanguageValue;
  name1: LanguageName;
  value1: LanguageValue;
  interface: {
    settings: string;
    registration: string;
    select_lang: string;
    login: string;
    icon: string;
    email: string;
    password: string;
    passwordRepeat: string;
    name: string;
    home: string;
    send: string;
    search: string;
    setLink: string;
    selectLang: string;
    subtitlesAreExists: string;
    minimum3Symbols: string;
    noResults: string;
    logout: string;
    needLogout: string;
    link: string;
    createAndCopyLink: string;
    more: string;
    close: string;
    confirmEmail: string;
  };
  content: {
    siteName: string;
    siteDescription: string;
  };
  messages: {
    linkNotValid: string;
    linkCreatedAndCopied: string;
    warningVideoIDNotSet: string;
    warningSubtitlesLangNotSet: string;
    warningSearchValueNotSet: string;
    warnigTimePointNotSelect: string;
    browserNotAccepted: string;
  };
  meta: {
    keywords: string;
    description: string;
  };
  server: {
    email: {
      send: string;
      notSend: string;
    };
    user: {
      errorGetByEmail: string;
      warningAreRegistered: string;
      errorRegistration: string;
      successRegistration: string;
      warningEmailNotSend: string;
      warningEmailNotValid: string;
      warningPasswordNotSend: string;
      warningPasswordRepeatNotSend: string;
      warningPasswordTooShort: string;
      warningPasswordsNotMatch: string;
      warningInputParamsNotSend: string;
      infoMinimumPasswordLength: string;
      warningGetUserData: string;
      successLogin: string;
      warningEmailNotRegister: string;
      warningEmailOrPasswordNotMatch: string;
      warningKeyNotSend: string;
      warningUserNotFound: string;
      warningKeyExpired: string;
      successEmailConfirmed: string;
      warningEmailConfirmedEarlier: string;
      errorConfirmedEmail: string;
    };
    subtitles: {
      successFound: string;
      successReceived: string;
      warningVideoIDNotSend: string;
      errorGettingVideoCaptions: string;
      warningSubtitlesNotFound: string;
      warningVideoNotFound: string;
      errorGettingVideoSubtitles: string;
      warningLangOfSubtitlesNotSend: string;
      errorGettingVideoInfo: string;
      warningVideoInfoNotFound: string;
      successVideoInfoReceived: string;
    };
    link: {
      errorCreate: string;
      successCreated: string;
      errorGettingLink: string;
      warningLinkNotFound: string;
      successReceived: string;
    };
  };
}

export declare type UserRoles = 'user' | 'guest';

export declare type StaticContext = {
  locales: LanguageValue[];
  locale: LanguageValue;
  defaultLocale: LanguageValue;
};

export declare interface Props {
  t: Language;
}

export declare interface StaticProps {
  props: {
    t: Language;
  };
}

export type Theme = {
  main: string;
  light: string;
  dark: string;
  error: string;
  warning: string;
  success: string;
  bg: string;
  white: string;
  info: string;
};

/**
 * Backend types
 */
export declare interface RequestHandler<T, U> {
  (parent: any, params: T, context: any, info: any): Promise<U>;
}

export declare interface RequestInterface {
  [route: string]: RequestHandler<any, any>;
}

export type OrmResult<T> = {
  error: 1 | 0;
  data?: T;
  message?: string;
};

export declare interface OrmHandler<T, U> {
  (params: T): Promise<OrmResult<U>>;
}

export interface ParsedToken {
  id: number;
  email: string;
  password: string;
  userAgent: string;
}

export declare namespace Orm {
  interface User {
    id: number;
    email: string;
    password: string;
    confirm: boolean;
    created: Date;
    updated: Date;
  }
  interface Link {
    id: number;
    user_id: number;
    link: string;
    description: string;
    created: Date;
  }
}

export type Email = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
};
