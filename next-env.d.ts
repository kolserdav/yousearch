/**
 * Application types (Frontend)
 * Types of requests show in /node/schecmas/index.ts
 */
/* eslint-disable no-unused-vars */
/// <reference types="next" />
/// <reference types="next/types/global" />
import * as Schema from './node/schemas'; // Import requests types
export { Schema };

export declare type ActionTypesUserFetch = 'USER_FETCH_REQUEST' | 'USER_FETCH';
export declare type ActionTypesTypesRegistration = 'REGISTRATION_REQUEST' | 'REGISTRATION';
export declare type ActionTypes = ActionTypesUserFetch | ActionTypesTypesRegistration | 'INITIAL';

export type Action<T> = {
  type: ActionTypes;
  body: T;
};

export type Resolvers = {
  Query: Schema.Query;
};

export type Reducer<T> = {
  type: ActionTypes;
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
