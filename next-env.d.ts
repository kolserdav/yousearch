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
  export declare type UserFetch = 'USER_FETCH_REQUEST' | 'USER_FETCH';
  export declare type Registration = 'REGISTRATION_REQUEST' | 'REGISTRATION';
  export declare type All = ActionTypesUserFetch | ActionTypesTypesRegistration | 'INITIAL';
}

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
  };
  server: {
    user: {
      errorGetByEmail: string;
      warningAreRegistered: string;
      errorRegistration: string;
      successRegistration: string;
    }
  };
}

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

type OrmResult<T> = {
  error: 1 | 0;
  data: T | string;
};

export declare interface OrmHandler<T, U> {
  (params: T): Promise<OrmResult<U>>;
}
