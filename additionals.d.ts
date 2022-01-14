/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import type * as NodeSchema from './node/schemas';
import type { User as PrismaUser } from '@prisma/client';
/**
 * Types of libraries
 */
declare module 'youtube-captions-scraper' {
  interface GetSubtitlesOptions {
    videoID: string;
    lang: string;
  }
  interface SubtitlesItem {
    start: string;
    dur: string;
    text: string;
  }
  export function getSubtitles(options: GetSubtitlesOptions): Promise<SubtitlesItem[]>;
}

declare global {
  type User = PrismaUser;
  interface ConfirmProps extends Props {
    result: Result;
    message: string;
    t: Language;
  }
  /**
   * Application types (Frontend)
   * Types of requests show in /node/schecmas/index.ts
   */

  export namespace Schema {
    /**
     * Valuest types of requests
     */
    export declare namespace Values {
      /** Global interfaces */
      interface Response {
        result: Result;
        message: string;
      }
      interface ServerResponse {
        readonly [key: string /** Handler name */]: Response;
      }
      /** Login values */
      type Login = {
        result: Result;
        message: string;
        token?: string;
      };
      interface LoginRequest extends ServerResponse {
        login?: Login;
      }
      /** Registration values */
      type Registration = {
        result: Result;
        message: string;
        warning?: string;
        token?: string;
      };
      interface RegistrationRequest extends ServerResponse {
        registration?: Registration;
      }
      /** Subtitle values */
      type SubtitlesItem = {
        start: string;
        dur: string;
        text: string;
      };
      type Subtitles = {
        result: Result;
        message: string;
        lang?: string;
        items?: SubtitlesItem[];
      };
      interface SubtitlesRequest extends ServerResponse {
        subtitles?: Subtitles;
      }
      /** Caption values */
      type CaptionsItem = {
        lang: string;
        type: string;
      };
      type Captions = {
        result: Result;
        message: string;
        items?: CaptionsItem[];
      };
      interface CaptionsRequest extends ServerResponse {
        captions?: Captions;
      }
      /** Info values */
      type Image = {
        url: string;
        width: string;
        height: string;
      };
      type Info = {
        result: Result;
        message: string;
        title?: string;
        image?: Image;
      };
      interface InfoRequest extends ServerResponse {
        info?: Info;
      }
      /** Auth values */
      type Auth = {
        result: Result;
        message: string;
        email?: string;
        confirm?: boolean;
        role?: UserRoles;
      };
      interface AuthRequest extends ServerResponse {
        auth?: Auth;
      }
      /** Link values */
      type Link = {
        result: Result;
        message: string;
        link?: string;
        description?: string;
      };
      interface LinkRequest extends ServerResponse {
        link?: Link;
      }
      /**
       * Confirm
       */
      interface ConfirmRequest extends ServerResponse {
        confirm?: Response;
      }
      /** Forgot values */
      interface ForgotRequest extends ServerResponse {
        forgot?: Response;
      }
      /** Change pass values */
      interface ChangePassRequest extends ServerResponse {
        changePass?: Response;
      }
      /** SendConfirm values */
      interface SendConfirmRequest extends ServerResponse {
        sendConfirm?: Response;
      }
      /** Visit values */
      interface VisitRequest extends ServerResponse {
        visit?: Response;
      }
    }

    /**
     * Params types of requests
     */
    export declare namespace Params {
      /** Global params */
      type ID = {
        input: {
          id: number;
        };
        results: string[];
      };
      type ResponseKeys = keyof Values.Response;
      /** Login params */
      type LoginKeys = keyof Values.Login;
      type Login = {
        input: {
          email: string;
          password: string;
        };
        results: LoginKeys[];
      };
      type ForgotInput = {
        email: string;
      };
      /** Registration params */
      type RegistrationKeys = keyof Values.Registration;
      type Registration = {
        input: {
          email: string;
          password: string;
          passwordRepeat: string;
        };
        results: RegistrationKeys[];
      };
      /** Subtitles params */
      type SubtitlesKeys = keyof Values.Subtitles;
      type Subtitles = {
        input: {
          videoID: string;
          lang: string;
        };
        results: Array<SubtitlesKeys[] | string>;
      };
      /** Captions params */
      type CaptionsKeys = keyof Values.Captions;
      type Captions = {
        input: {
          videoID: string;
        };
        results: Array<CaptionsKeys[] | string>;
      };
      type CaptionsInput = {
        videoID: string;
      };
      /** Link params */
      type LinkKeys = keyof Values.Response;
      type Link = {
        input: {
          link: string;
          userId?: number;
          description: string;
        };
        results: Array<LinkKeys[] | string>;
      };
      /** Confirm params */
      type ConfirmKeys = keyof Values.Response;
      type Confirm = {
        input: {
          email: string;
          key: string;
        };
        results: Array<ConfirmKeys[]>;
      };
      /** Forgot params */
      type ForgotKeys = keyof Values.Response;
      type Forgot = {
        input: {
          email: string;
        };
        results: Array<ForgotKeys[]>;
      };
      /** Change pass params */
      type ChangePass = {
        input: {
          key: string;
          email: string;
          password: string;
          passwordRepeat: string;
        };
        results: Array<ResponseKeys[]>;
      };
      /** Visit params */
      type Roles = 'user' | 'guest';
      type Visit = {
        input: {
          is_old: boolean;
          width: number;
          height: number;
          user_agent?: string;
          ip?: string;
          role?: Roles;
          path?: string;
          error?: string;
        };
        results?: Array<ResponseKeys[]>;
      };
    }

    export interface Query extends RequestInterface {
      auth: RequestHandler<void, Values.Auth>;
      link: RequestHandler<Params.ID, Values.Link>;
    }

    /**
     * Mutation methods first set here
     */
    export interface Mutation extends RequestInterface {
      registration: RequestHandler<Params.Registration, Values.Registration>;
      login: RequestHandler<Params.Login, Values.Login>;
      subtitles: RequestHandler<Params.Subtitles, Values.Subtitles>;
      captions: RequestHandler<Params.Captions, Values.Captions>;
      info: RequestHandler<Params.Captions, Values.Info>;
      link: RequestHandler<Params.Link, Values.Link>;
      confirm: RequestHandler<Params.Confirm, Values.Response>;
      forgot: RequestHandler<Params.Forgot, Values.Response>;
      changePass: RequestHandler<Params.ChangePass, Values.Response>;
      sendConfirm: RequestHandler<Params.Forgot, Values.Response>;
      visit: RequestHandler<Params.Visit, Values.Response>;
    }

    export interface Resolver {
      Query: Query;
      Mutation: Mutation;
    }
  }
  export declare type Login = 'LOGIN_REQUEST' | 'LOGIN';
  export declare type Registration = 'REGISTRATION_REQUEST' | 'REGISTRATION';
  export declare type Subtitles = 'SUBTITLES_REQUEST' | 'SUBTITLES';
  export declare type Captions = 'CAPTIONS_REQUEST' | 'CAPTIONS';
  export declare type Info = 'INFO_REQUEST' | 'INFO';
  export declare type Auth = 'AUTH_REQUEST' | 'AUTH';
  export declare type Link = 'LINK_REQUEST' | 'LINK';
  export declare type GetLink = 'GET_LINK_REQUEST' | 'GET_LINK';
  export declare type Confirm = 'CONFIRM_REQUEST' | 'CONFIRM';
  export declare type Forgot = 'FORGOT_REQUEST' | 'FORGOT';
  export declare type ChangePass = 'CHANGE_PASS_REQUEST' | 'CHANGE_PASS';
  export declare type SendConfirm = 'SEND_CONFIRM_REQUEST' | 'SEND_CONFIRM';
  export declare type Visit = 'VISIT_REQUEST' | 'VISIT_CONFIRM';
  type All =
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
    | Forgot
    | SendConfirm
    | ChangePass
    | Visit
    | 'INITIAL';

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
    type: All;
    body: T;
  };

  export type Resolvers = {
    Query: Schema.Query;
  };

  export type Reducer<T> = {
    type: All;
    body: Action<T>;
    [key?: string]: Action<T> | undefined;
  };

  export type RequestCallback<T, U> = (context: Action<T>, ...args: any[]) => U;

  export interface Request<T> {
    context: unknown;
    fn: (context: Action<T>, ...args: any[]) => Promise<any>;
  }

  export declare type Result = 'error' | 'warning' | 'success';

  export declare type ThemeProps = {
    children: React.ReactElement | React.ReactElement[];
  };

  export type AppBarProps = {
    t: Language;
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
      no: string;
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
      forgotPassword: string;
      pageNotFound: string;
      changePassword: string;
      sendNewEmail: string;
      copied: string;
      about: string;
      accept: string;
      policy: string;
    };
    content: {
      siteName: string;
      siteDescription: string;
      about: string;
      donate: string;
      donateLink: string;
      sourceCode: string;
      isLicensed: string;
      acceptTos: string;
      contactInformation: string;
      closed: string;
    };
    messages: {
      linkNotValid: string;
      linkCreatedAndCopied: string;
      warningVideoIDNotSet: string;
      warningSubtitlesLangNotSet: string;
      warningSearchValueNotSet: string;
      warnigTimePointNotSelect: string;
      browserNotAccepted: string;
      warningEmailNotConfirm: string;
    };
    meta: {
      keywords: string;
      description: string;
    };
    server: {
      forbidden: string;
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
        errorSendingForgotEmail: string;
        successForgotEmailIsSend: string;
        errorUpdatePassword: string;
        successPasswordUpdated: string;
        successSendConfirmEmail: string;
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
      letter: {
        proofOfAddress: string;
        hello: string;
        youEmailAddress: string;
        toConfirmAddress: string;
        link: string;
        whichIsValid: string;
        days: string;
        changePassword: string;
        wasInitiated: string;
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
  }

  export declare namespace Orm {
    interface User {
      name: string;
      email: string;
      verifiedEmail: boolean;
      googleId: string;
      role: string;
      picture: string;
      updated_at: Date;
      locale: string;
    }
    interface Link {
      id: number;
      user_id: number;
      link: string;
      description: string;
      created: Date;
    }
    interface Visit {
      id: number;
      user_agent: string;
      ip: string;
      is_old: boolean;
      path: string;
      error: any;
      width: number;
      height: number;
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
}
